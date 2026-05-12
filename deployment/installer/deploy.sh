#!/usr/bin/env bash
# =============================================================================
#  MultipathIQ — Universal Deployment Script
#  Supports: macOS · Linux · RHEL/CentOS/Fedora · Ubuntu/Debian
#
#  Usage:
#    curl -fsSL https://raw.githubusercontent.com/ZoneAssure/MultipathIQ-Main/main/deployment/installer/deploy.sh | bash
#    — or —
#    bash deploy.sh [--install-dir /path] [--port 4173] [--no-mpathctl]
# =============================================================================
set -euo pipefail

# ── Constants ──────────────────────────────────────────────────────────────────
readonly REPO_URL="https://github.com/mackdev25/multipatha.iq.git"
readonly APP_NAME="MultipathIQ"
readonly APP_VERSION="v1.0.1"
readonly NODE_MIN_VERSION=18
readonly DEFAULT_PORT=4173
readonly CONFIG_DIR="${HOME}/.mpathiq"
readonly PID_FILE="${CONFIG_DIR}/server.pid"
readonly LOG_DIR="${CONFIG_DIR}/logs"
readonly LOG_FILE="${LOG_DIR}/server.log"
readonly MPATHCTL_RELEASES="https://github.com/ZoneAssure/MultipathIQ-Main/releases/latest/download"

# ── Colours ────────────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
  CYAN='\033[0;36m'; BCYAN='\033[0;96m'; BOLD='\033[1m'
  DIM='\033[2m'; NC='\033[0m'
else
  RED=''; GREEN=''; YELLOW=''; CYAN=''; BCYAN=''; BOLD=''; DIM=''; NC=''
fi

# ── Arguments ──────────────────────────────────────────────────────────────────
INSTALL_DIR="${HOME}/.local/share/multipathiq"
APP_PORT="${DEFAULT_PORT}"
SKIP_MPATHCTL=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --install-dir) INSTALL_DIR="$2"; shift 2 ;;
    --port)        APP_PORT="$2";    shift 2 ;;
    --no-mpathctl) SKIP_MPATHCTL=true; shift ;;
    *) shift ;;
  esac
done

# ── Helpers ────────────────────────────────────────────────────────────────────
info()    { echo -e "${CYAN}  ·${NC}  $*"; }
success() { echo -e "${GREEN}  ✔${NC}  $*"; }
warn()    { echo -e "${YELLOW}  !${NC}  $*"; }
error()   { echo -e "${RED}  ✖${NC}  $*"; exit 1; }
section() { echo -e "\n${BOLD}${CYAN}  ── $* ──${NC}"; }

# ── Banner ─────────────────────────────────────────────────────────────────────
print_banner() {
  clear
  echo ""
  echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${BCYAN}███╗   ███╗██████╗  █████╗ ████████╗██╗  ██╗${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${BCYAN}████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${BCYAN}██╔████╔██║██████╔╝███████║   ██║   ███████║${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${BCYAN}██║╚██╔╝██║██╔═══╝ ██╔══██║   ██║   ██╔══██║${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${BCYAN}██║ ╚═╝ ██║██║     ██║  ██║   ██║   ██║  ██║${NC}  ${BOLD}IQ${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${BCYAN}╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝${NC}"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}   ${DIM}Multipath Intelligence Platform  ·  SAN Fabric Analytics${NC}"
  echo -e "${CYAN}║${NC}   ${DIM}Deployment Installer  ·  ${APP_VERSION}${NC}"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

# ── OS Detection ───────────────────────────────────────────────────────────────
detect_os() {
  local uname_s
  uname_s="$(uname -s 2>/dev/null || echo unknown)"
  case "$uname_s" in
    Darwin*)
      OS="macos"
      PKG_MANAGER="brew"
      ;;
    Linux*)
      if   [[ -f /etc/redhat-release ]] || [[ -f /etc/rhel-release ]]; then
        OS="rhel"
        PKG_MANAGER="dnf"
        # Fallback to yum on older RHEL/CentOS
        command -v dnf &>/dev/null || PKG_MANAGER="yum"
      elif [[ -f /etc/debian_version ]]; then
        OS="debian"
        PKG_MANAGER="apt-get"
      elif [[ -f /etc/arch-release ]]; then
        OS="arch"
        PKG_MANAGER="pacman"
      else
        OS="linux"
        PKG_MANAGER="unknown"
      fi
      ;;
    MINGW*|MSYS*|CYGWIN*)
      error "Windows detected. Please use deploy.ps1 instead:\n  PowerShell -ExecutionPolicy Bypass -File deploy.ps1"
      ;;
    *)
      error "Unsupported OS: ${uname_s}"
      ;;
  esac
  ARCH="$(uname -m)"
}

# ── Privilege helper ───────────────────────────────────────────────────────────
run_sudo() {
  if [[ $EUID -eq 0 ]]; then
    "$@"
  else
    sudo "$@"
  fi
}

# ── Dependency installers ──────────────────────────────────────────────────────
require_cmd() {
  command -v "$1" &>/dev/null
}

install_git() {
  case "$OS" in
    macos)  brew install git ;;
    rhel)   run_sudo "$PKG_MANAGER" install -y git ;;
    debian) run_sudo apt-get update -qq && run_sudo apt-get install -y git ;;
    arch)   run_sudo pacman -S --noconfirm git ;;
    *)      error "Cannot auto-install git on $OS. Please install git manually." ;;
  esac
}

install_node() {
  info "Installing Node.js via nvm..."
  export NVM_DIR="${HOME}/.nvm"
  if [[ ! -d "${NVM_DIR}" ]]; then
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  fi
  # shellcheck source=/dev/null
  [[ -s "${NVM_DIR}/nvm.sh" ]] && source "${NVM_DIR}/nvm.sh"
  nvm install 20
  nvm use 20
  nvm alias default 20
}

check_node_version() {
  local ver
  ver=$(node -e "process.exit(parseInt(process.versions.node) >= ${NODE_MIN_VERSION} ? 0 : 1)" 2>/dev/null && echo "ok" || echo "fail")
  [[ "$ver" == "ok" ]]
}

# ── mpathctl binary installer ──────────────────────────────────────────────────
install_mpathctl_binary() {
  local bin_dir="${HOME}/.local/bin"
  local bin_target="${bin_dir}/mpathctl"
  mkdir -p "$bin_dir"

  # Determine binary name based on OS + arch
  local bin_name
  case "$OS" in
    macos)
      [[ "$ARCH" == "arm64" ]] && bin_name="mpathctl-darwin-arm64" || bin_name="mpathctl-darwin-amd64"
      ;;
    rhel|debian|linux|arch)
      [[ "$ARCH" == "aarch64" || "$ARCH" == "arm64" ]] \
        && bin_name="mpathctl-linux-arm64" \
        || bin_name="mpathctl-linux-amd64"
      ;;
    *)
      warn "Cannot determine mpathctl binary for OS: $OS"
      return 1
      ;;
  esac

  # Try to download pre-built binary from GitHub releases
  if curl -fsSL --connect-timeout 10 "${MPATHCTL_RELEASES}/${bin_name}" -o "$bin_target" 2>/dev/null; then
    chmod +x "$bin_target"
    success "mpathctl binary installed"
  else
    # Fallback: compile from source if Go is available
    if command -v go &>/dev/null; then
      info "Building mpathctl from source..."
      pushd "${INSTALL_DIR}/deployment/installer/mpathctl" &>/dev/null
      go build -ldflags="-s -w -X main.AppVersion=${APP_VERSION}" -o "$bin_target" .
      popd &>/dev/null
      success "mpathctl compiled and installed"
    else
      warn "mpathctl could not be installed (no binary and no Go toolchain)."
      warn "Install Go from https://go.dev/dl/ and re-run: go build ./deployment/installer/mpathctl"
      return 0
    fi
  fi

  # Add ~/.local/bin to PATH in shell profile if not already present
  add_to_path "$bin_dir"
}

add_to_path() {
  local dir="$1"
  # Detect shell config file
  local rc_file
  if [[ -n "${ZSH_VERSION:-}" ]] || [[ "${SHELL}" == *zsh* ]]; then
    rc_file="${HOME}/.zshrc"
  else
    rc_file="${HOME}/.bashrc"
  fi

  local export_line="export PATH=\"${dir}:\$PATH\""
  if ! grep -qF "$dir" "$rc_file" 2>/dev/null; then
    echo "" >> "$rc_file"
    echo "# MultipathIQ — mpathctl CLI" >> "$rc_file"
    echo "$export_line" >> "$rc_file"
    success "Added ${dir} to PATH in ${rc_file}"
    info "Run: source ${rc_file}  (or open a new terminal)"
  fi
}

# ── Write config ───────────────────────────────────────────────────────────────
write_config() {
  mkdir -p "$CONFIG_DIR" "$LOG_DIR"
  cat > "${CONFIG_DIR}/config.json" <<EOF
{
  "installDir": "${INSTALL_DIR}",
  "port": ${APP_PORT},
  "version": "${APP_VERSION}",
  "installedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
  success "Config written to ${CONFIG_DIR}/config.json"
}

# ── Start server as background process ────────────────────────────────────────
start_server() {
  # Stop any existing instance
  if [[ -f "$PID_FILE" ]]; then
    local old_pid
    old_pid=$(cat "$PID_FILE" 2>/dev/null || echo "")
    if [[ -n "$old_pid" ]] && kill -0 "$old_pid" 2>/dev/null; then
      info "Stopping previous instance (PID ${old_pid})..."
      kill "$old_pid" 2>/dev/null || true
      sleep 1
    fi
  fi

  mkdir -p "$LOG_DIR"

  # Launch npm start in background
  PORT="${APP_PORT}" nohup npm start \
    --prefix "${INSTALL_DIR}" \
    > "${LOG_FILE}" 2>&1 &
  local pid=$!
  echo "$pid" > "$PID_FILE"

  # Wait briefly then confirm the process is still alive
  sleep 3
  if kill -0 "$pid" 2>/dev/null; then
    success "Server started (PID ${pid})"
    echo ""
    echo -e "  ${BOLD}${GREEN}➜${NC}  App running:  ${BOLD}${BCYAN}http://localhost:${APP_PORT}${NC}"
    echo ""
  else
    warn "Server may have failed to start. Check logs:"
    warn "  tail -f ${LOG_FILE}"
  fi
}

# ── Print final summary ────────────────────────────────────────────────────────
print_summary() {
  echo ""
  echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}${GREEN}Installation Complete${NC}"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}   ${DIM}Install Dir${NC}   ${INSTALL_DIR}"
  echo -e "${CYAN}║${NC}   ${DIM}Config${NC}        ${CONFIG_DIR}/config.json"
  echo -e "${CYAN}║${NC}   ${DIM}Logs${NC}          ${LOG_FILE}"
  echo -e "${CYAN}║${NC}   ${DIM}Port${NC}          ${APP_PORT}"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}╠═══════════════════════════════════════════════════════════════════╣${NC}"
  echo -e "${CYAN}║${NC}   ${BOLD}mpathctl commands${NC}"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl status    ${NC}—  Show server status"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl health    ${NC}—  HTTP health check"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl start     ${NC}—  Start the server"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl stop      ${NC}—  Stop the server"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl restart   ${NC}—  Restart the server"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl logs      ${NC}—  View / tail logs"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl doctor    ${NC}—  Diagnose issues"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl expose    ${NC}—  Show network access URLs"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl version   ${NC}—  Version info"
  echo -e "${CYAN}║${NC}   ${DIM}mpathctl uninstall ${NC}—  Uninstall everything"
  echo -e "${CYAN}║${NC}"
  echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

# ══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════════════════
print_banner
detect_os

info "Detected OS: ${OS} (${ARCH})"
info "Install directory: ${INSTALL_DIR}"
info "App port: ${APP_PORT}"
echo ""

# ── 1. Check / install git ────────────────────────────────────────────────────
section "Checking prerequisites"

if require_cmd git; then
  success "git $(git --version | awk '{print $3}')"
else
  warn "git not found — installing..."
  install_git
  success "git installed"
fi

# ── 2. Check / install Node.js ────────────────────────────────────────────────
if require_cmd node && check_node_version; then
  success "node $(node --version)"
else
  warn "Node.js ${NODE_MIN_VERSION}+ not found — installing via nvm..."
  install_node
  success "node $(node --version)"
fi

if require_cmd npm; then
  success "npm $(npm --version)"
else
  error "npm not found after Node.js installation. Please install manually."
fi

# ── 3. Clone or update repository ─────────────────────────────────────────────
section "Fetching source"

mkdir -p "$(dirname "$INSTALL_DIR")"
if [[ -d "${INSTALL_DIR}/.git" ]]; then
  info "Repository already exists — pulling latest changes..."
  git -C "$INSTALL_DIR" pull --ff-only
  success "Repository updated"
else
  info "Cloning ${REPO_URL} into ${INSTALL_DIR}..."
  git clone --depth 1 "$REPO_URL" "$INSTALL_DIR"
  success "Repository cloned"
fi

# ── 4. Install npm dependencies ───────────────────────────────────────────────
section "Installing dependencies"

cd "$INSTALL_DIR"
npm ci --prefer-offline --no-audit --no-fund --silent
success "Dependencies installed"

# ── 5. Build ──────────────────────────────────────────────────────────────────
section "Building production bundle"

npm run build --silent
success "Build complete"

# ── 6. Write config ───────────────────────────────────────────────────────────
section "Writing configuration"
write_config

# ── 7. Install mpathctl ───────────────────────────────────────────────────────
if [[ "$SKIP_MPATHCTL" == false ]]; then
  section "Installing mpathctl CLI"
  install_mpathctl_binary
fi

# ── 8. Start server ───────────────────────────────────────────────────────────
section "Starting server"
start_server

# ── 9. Summary ────────────────────────────────────────────────────────────────
print_summary
