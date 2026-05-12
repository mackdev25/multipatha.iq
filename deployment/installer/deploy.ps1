#Requires -Version 5.1
<#
.SYNOPSIS
    Mpath — Windows Deployment Script
.DESCRIPTION
    Detects environment, installs prerequisites, clones the repository,
    builds the app, starts it as a background job, and installs mpathctl.
.PARAMETER InstallDir
    Installation directory. Defaults to %LOCALAPPDATA%\Mpath
.PARAMETER Port
    Port to serve the app on. Defaults to 4173.
.PARAMETER NoMpathctl
    Skip mpathctl installation.
.EXAMPLE
    PowerShell -ExecutionPolicy Bypass -File deploy.ps1
    PowerShell -ExecutionPolicy Bypass -File deploy.ps1 -Port 8080
#>

[CmdletBinding()]
param(
    [string] $InstallDir = "$env:LOCALAPPDATA\Mpath",
    [int]    $Port       = 4173,
    [switch] $NoMpathctl
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── Constants ──────────────────────────────────────────────────────────────────
$REPO_URL          = "https://github.com/mackdev25/mpath-main.git"
$APP_NAME          = "Mpath"
$APP_VERSION       = "v1.0.1"
$NODE_MIN_VERSION  = 18
$CONFIG_DIR        = "$env:USERPROFILE\.mpath"
$LOG_DIR           = "$CONFIG_DIR\logs"
$LOG_FILE          = "$LOG_DIR\server.log"
$PID_FILE          = "$CONFIG_DIR\server.pid"
$MPATHCTL_RELEASES = "https://github.com/mackdev25/mpath-main/releases/download/v1.0.1"
$BIN_DIR           = "$env:USERPROFILE\.local\bin"

# ── Colour helpers ─────────────────────────────────────────────────────────────
function Write-Info    { param($msg) Write-Host "  · " -ForegroundColor Cyan   -NoNewline; Write-Host $msg }
function Write-Success { param($msg) Write-Host "  ✔ " -ForegroundColor Green  -NoNewline; Write-Host $msg }
function Write-Warn    { param($msg) Write-Host "  ! " -ForegroundColor Yellow -NoNewline; Write-Host $msg }
function Write-Err     { param($msg) Write-Host "  ✖ " -ForegroundColor Red    -NoNewline; Write-Host $msg; exit 1 }
function Write-Section { param($msg) Write-Host "`n  ── $msg ──" -ForegroundColor Cyan }

# ── Banner ─────────────────────────────────────────────────────────────────────
function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "  ╔═══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "  ║" -ForegroundColor Cyan
    Write-Host "  ║   " -ForegroundColor Cyan -NoNewline
    Write-Host "███╗   ███╗██████╗  █████╗ ████████╗██╗  ██╗" -ForegroundColor Cyan
    Write-Host "  ║   " -ForegroundColor Cyan -NoNewline
    Write-Host "████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║" -ForegroundColor Cyan
    Write-Host "  ║   " -ForegroundColor Cyan -NoNewline
    Write-Host "██╔████╔██║██████╔╝███████║   ██║   ███████║" -ForegroundColor Cyan
    Write-Host "  ║   " -ForegroundColor Cyan -NoNewline
    Write-Host "██║╚██╔╝██║██╔═══╝ ██╔══██║   ██║   ██╔══██║" -ForegroundColor Cyan
    Write-Host "  ║   " -ForegroundColor Cyan -NoNewline
    Write-Host "██║ ╚═╝ ██║██║     ██║  ██║   ██║   ██║  ██║  IQ" -ForegroundColor Cyan
    Write-Host "  ║   " -ForegroundColor Cyan -NoNewline
    Write-Host "╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝" -ForegroundColor Cyan
    Write-Host "  ║" -ForegroundColor Cyan
    Write-Host "  ║   Multipath Intelligence Platform  ·  SAN Fabric Analytics" -ForegroundColor DarkGray
    Write-Host "  ║   Deployment Installer  ·  $APP_VERSION" -ForegroundColor DarkGray
    Write-Host "  ║" -ForegroundColor Cyan
    Write-Host "  ╚═══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

# ── Arch detection ─────────────────────────────────────────────────────────────
function Get-MpathArch {
    if ([System.Environment]::Is64BitOperatingSystem) { return "amd64" }
    return "386"
}

# ── Command availability ───────────────────────────────────────────────────────
function Test-Command { param($cmd) return [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }

# ── Node.js version check ──────────────────────────────────────────────────────
function Test-NodeVersion {
    try {
        $ver = (node --version 2>$null) -replace 'v','' -split '\.' | Select-Object -First 1
        return ([int]$ver -ge $NODE_MIN_VERSION)
    } catch { return $false }
}

# ── Install Node.js via winget ────────────────────────────────────────────────
function Install-Node {
    Write-Info "Installing Node.js via winget..."
    if (Test-Command winget) {
        winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements -e
    } elseif (Test-Command choco) {
        choco install nodejs-lts -y
    } else {
        Write-Err "Cannot auto-install Node.js. Please install from https://nodejs.org and re-run."
    }
    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" `
              + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# ── Install Git ────────────────────────────────────────────────────────────────
function Install-Git {
    Write-Info "Installing Git via winget..."
    if (Test-Command winget) {
        winget install --id Git.Git --accept-source-agreements --accept-package-agreements -e
    } elseif (Test-Command choco) {
        choco install git -y
    } else {
        Write-Err "Cannot auto-install Git. Please install from https://git-scm.com and re-run."
    }
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" `
              + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# ── Write config ───────────────────────────────────────────────────────────────
function Write-AppConfig {
    New-Item -ItemType Directory -Force -Path $CONFIG_DIR | Out-Null
    New-Item -ItemType Directory -Force -Path $LOG_DIR   | Out-Null
    $cfg = @{
        installDir  = $InstallDir
        port        = $Port
        version     = $APP_VERSION
        installedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    } | ConvertTo-Json
    Set-Content -Path "$CONFIG_DIR\config.json" -Value $cfg -Encoding UTF8
    Write-Success "Config written to $CONFIG_DIR\config.json"
}

# ── Add directory to user PATH ─────────────────────────────────────────────────
function Add-ToUserPath {
    param([string]$Dir)
    $current = [System.Environment]::GetEnvironmentVariable("Path", "User")
    if ($current -notlike "*$Dir*") {
        [System.Environment]::SetEnvironmentVariable("Path", "$current;$Dir", "User")
        $env:Path += ";$Dir"
        Write-Success "Added $Dir to user PATH"
        Write-Info "Open a new terminal for PATH changes to take effect"
    }
}

# ── Install mpathctl binary ────────────────────────────────────────────────────
function Install-Mpathctl {
    New-Item -ItemType Directory -Force -Path $BIN_DIR | Out-Null
    $arch       = Get-MpathArch
    $binName    = "mpathctl-windows-$arch.exe"
    $targetPath = "$BIN_DIR\mpathctl.exe"

    Write-Info "Downloading mpathctl binary ($binName)..."
    try {
        Invoke-WebRequest -Uri "$MPATHCTL_RELEASES/$binName" -OutFile $targetPath -UseBasicParsing -ErrorAction Stop
        Write-Success "mpathctl installed at $targetPath"
    } catch {
        # Fallback: compile from source if Go is available
        if (Test-Command go) {
            Write-Info "Building mpathctl from source..."
            $srcDir = "$InstallDir\deployment\installer\mpathctl"
            Push-Location $srcDir
            go build -ldflags="-s -w -X main.AppVersion=$APP_VERSION" -o $targetPath .
            Pop-Location
            Write-Success "mpathctl compiled and installed"
        } else {
            Write-Warn "mpathctl could not be installed (no binary and no Go toolchain)."
            Write-Warn "Install Go from https://go.dev/dl/ and re-run."
            return
        }
    }

    Add-ToUserPath $BIN_DIR
}

# ── Start server as background job ─────────────────────────────────────────────
function Start-AppServer {
    # Stop existing instance
    if (Test-Path $PID_FILE) {
        $oldPid = Get-Content $PID_FILE -ErrorAction SilentlyContinue
        if ($oldPid) {
            try { Stop-Process -Id ([int]$oldPid) -Force -ErrorAction SilentlyContinue } catch {}
        }
    }

    New-Item -ItemType Directory -Force -Path $LOG_DIR | Out-Null

    # Start server as a background job
    $job = Start-Job -ScriptBlock {
        param($dir, $port, $log)
        Set-Location $dir
        $env:PORT = $port
        npm start *> $log
    } -ArgumentList $InstallDir, $Port, $LOG_FILE

    # Give the server a moment to start
    Start-Sleep -Seconds 4

    if ($job.State -eq 'Running') {
        $job.Id | Out-File $PID_FILE -Encoding ASCII
        Write-Success "Server started (Job ID $($job.Id))"
        Write-Host ""
        Write-Host "  " -NoNewline
        Write-Host "➜  App running:  " -NoNewline -ForegroundColor Green
        Write-Host "http://localhost:$Port" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Warn "Server may have failed to start. Check logs:"
        Write-Warn "  Get-Content -Wait $LOG_FILE"
    }
}

# ── Summary ────────────────────────────────────────────────────────────────────
function Show-Summary {
    Write-Host ""
    Write-Host "  ╔═══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "  ║   " -NoNewline -ForegroundColor Cyan; Write-Host "Installation Complete" -ForegroundColor Green
    Write-Host "  ║" -ForegroundColor Cyan
    Write-Host "  ║   Install Dir  : $InstallDir" -ForegroundColor DarkGray
    Write-Host "  ║   Config       : $CONFIG_DIR\config.json" -ForegroundColor DarkGray
    Write-Host "  ║   Logs         : $LOG_FILE" -ForegroundColor DarkGray
    Write-Host "  ║   Port         : $Port" -ForegroundColor DarkGray
    Write-Host "  ║" -ForegroundColor Cyan
    Write-Host "  ╠═══════════════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
    Write-Host "  ║   mpathctl commands" -ForegroundColor Cyan
    Write-Host "  ║" -ForegroundColor Cyan
    @(
        "mpathctl status    — Show server status",
        "mpathctl health    — HTTP health check",
        "mpathctl start     — Start the server",
        "mpathctl stop      — Stop the server",
        "mpathctl restart   — Restart the server",
        "mpathctl logs      — View / tail logs",
        "mpathctl doctor    — Diagnose issues",
        "mpathctl expose    — Show network access URLs",
        "mpathctl version   — Version info",
        "mpathctl uninstall — Uninstall everything"
    ) | ForEach-Object { Write-Host "  ║   $_" -ForegroundColor DarkGray }
    Write-Host "  ║" -ForegroundColor Cyan
    Write-Host "  ╚═══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

# ══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════════════════
Show-Banner

Write-Info "Install directory : $InstallDir"
Write-Info "App port          : $Port"
Write-Host ""

# 1 ── Prerequisites ────────────────────────────────────────────────────────────
Write-Section "Checking prerequisites"

if (Test-Command git) { Write-Success "git $(git --version)" }
else { Install-Git; Write-Success "git installed" }

if ((Test-Command node) -and (Test-NodeVersion)) { Write-Success "node $(node --version)" }
else { Install-Node; Write-Success "node $(node --version)" }

if (Test-Command npm) { Write-Success "npm $(npm --version)" }
else { Write-Err "npm not found. Please reinstall Node.js." }

# 2 ── Clone / update repository ────────────────────────────────────────────────
Write-Section "Fetching source"

New-Item -ItemType Directory -Force -Path (Split-Path $InstallDir) | Out-Null
if (Test-Path "$InstallDir\.git") {
    Write-Info "Updating existing repository..."
    git -C $InstallDir pull --ff-only
    Write-Success "Repository updated"
} else {
    Write-Info "Cloning $REPO_URL..."
    git clone --depth 1 $REPO_URL $InstallDir
    Write-Success "Repository cloned"
}

# 3 ── npm install ──────────────────────────────────────────────────────────────
Write-Section "Installing dependencies"
Set-Location $InstallDir
npm ci --prefer-offline --no-audit --no-fund --silent
Write-Success "Dependencies installed"

# 4 ── Build ────────────────────────────────────────────────────────────────────
Write-Section "Building production bundle"
npm run build --silent
Write-Success "Build complete"

# 5 ── Write config ─────────────────────────────────────────────────────────────
Write-Section "Writing configuration"
Write-AppConfig

# 6 ── mpathctl ─────────────────────────────────────────────────────────────────
if (-not $NoMpathctl) {
    Write-Section "Installing mpathctl CLI"
    Install-Mpathctl
}

# 7 ── Start server ─────────────────────────────────────────────────────────────
Write-Section "Starting server"
Start-AppServer

# 8 ── Summary ──────────────────────────────────────────────────────────────────
Show-Summary
