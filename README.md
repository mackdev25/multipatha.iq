<div align="center">

```
███╗   ███╗██████╗  █████╗ ████████╗██╗  ██╗
████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
██╔████╔██║██████╔╝███████║   ██║   ███████║
██║╚██╔╝██║██╔═══╝ ██╔══██║   ██║   ██╔══██║
██║ ╚═╝ ██║██║     ██║  ██║   ██║   ██║  ██║  IQ
╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
```

# Mpath

**Multipath Intelligence Platform — SAN Fabric Analytics**

Advanced SAN zone validation, topology mapping & fabric intelligence for enterprise storage networks.

[![Version](https://img.shields.io/badge/version-v1.0.1-06b6d4?style=flat-square)](https://github.com/mackdev25/mpath/releases)
[![License](https://img.shields.io/badge/license-MIT-10b981?style=flat-square)](LICENSE)
[![Built with React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Built by Superstack](https://img.shields.io/badge/Built%20by-Superstack-8b5cf6?style=flat-square)](https://www.superstack.in/)

</div>

---

## Overview

**Mpath** is a production-grade, browser-based SAN fabric analytics platform. Upload your fabric data (CSV/Excel), and Mpath instantly validates zone configurations, maps storage topologies, identifies single points of failure, and generates exportable audit reports — all without sending data to the cloud.

### Key Capabilities

- **SAN Zone Validation** — Deep inspection of zoning rules, alias conflicts, and misconfigurations
- **Topology Diagrams** — Interactive fabric topology with host-to-storage path visualization
- **Connection Matrix** — Zone-by-port cross-reference matrix for rapid audit review
- **Storage Mapping** — End-to-end path mapping from initiator to target LUNs
- **AI Observability** *(optional)* — Connect Azure OpenAI, Claude, Gemini, or OpenAI for intelligent diagnostics
- **Export** — Download reports as Excel or PDF

---

## Getting Started

### Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | 18 LTS |
| npm | 9+ |

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/mackdev25/mpath.git
cd mpath

# 2. Install dependencies
npm install

# 3. Build the production bundle
npm run build

# 4. Start (production mode — shows enterprise CLI banner)
npm start
```

> `npm start` serves the **production build** via Vite preview.  
> For active development with hot-reload use `npm run dev` instead.

---

## Deployment

### One-line Installer (macOS / Linux / RHEL)

```bash
curl -fsSL https://raw.githubusercontent.com/mackdev25/mpath/main/deployment/installer/deploy.sh | bash
```

Automatically detects your OS, installs Node.js via `nvm` if needed, clones the repo, builds, starts the server, and installs the `mpathctl` CLI.

### Windows

```powershell
PowerShell -ExecutionPolicy Bypass -File deployment\installer\deploy.ps1
```

### Docker

```bash
cd deployment/docker
docker compose up -d
# App available at http://localhost:80
```

### Podman (rootless)

```bash
cd deployment/podman
podman-compose up -d
# App available at http://localhost:8080
```

---

## mpathctl CLI

`mpathctl` is a native Go binary installed automatically by the deployment scripts. It gives you full lifecycle control of the Mpath server from any terminal.

```bash
mpathctl status      # Show server status & metadata
mpathctl health      # HTTP health check
mpathctl start       # Start the server in the background
mpathctl stop        # Stop the server
mpathctl restart     # Restart the server
mpathctl logs        # Tail the last 50 lines of logs
mpathctl doctor      # Diagnose Node.js, npm, git & install integrity
mpathctl expose      # Print local + network access URLs
mpathctl version     # Version & platform info
mpathctl uninstall   # Stop server & remove all files
mpathctl help        # Show all commands
```

#### Build from source

```bash
cd deployment/installer/mpathctl
make release          # Cross-compile for all platforms
```

Produces binaries for Linux (amd64/arm64), macOS (amd64/arm64), and Windows (amd64/386) in `dist/`.

---

## Project Structure

```
├── src/
│   ├── components/         # Shared UI components
│   │   └── diagrams/       # Topology, matrix & flow diagrams
│   ├── pages/
│   │   ├── HomePage.tsx    # Upload & validation workflow
│   │   ├── Observability.tsx
│   │   ├── SettingsPage.tsx
│   │   └── documentation/  # In-app docs
│   ├── ai/                 # AI provider integrations (Azure, OpenAI, Claude, Gemini)
│   ├── utils/              # Fabric validator, Excel utilities
│   └── types/
├── deployment/
│   ├── docker/             # Dockerfile + nginx + compose
│   ├── podman/             # Containerfile + rootless compose
│   └── installer/
│       ├── deploy.sh       # Universal POSIX installer
│       ├── deploy.ps1      # Windows PowerShell installer
│       └── mpathctl/       # Go CLI source + Makefile
└── scripts/
    └── start.mjs           # Production start script (CLI banner)
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.9 |
| UI | MUI (Material UI) v9, Tailwind CSS v4 |
| Charts | Recharts |
| Diagrams | Mermaid |
| Build | Vite 7, SWC |
| Server (prod) | Vite Preview → nginx (container) |
| CLI | Go 1.22 (stdlib only) |
| AI | Azure OpenAI · OpenAI · Anthropic Claude · Google Gemini |

---

## Configuration

| Environment Variable | Default | Description |
|---|---|---|
| `PORT` | `4173` | Port for the production server |

AI provider keys are configured in-app via **Settings → AI Observability**.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push and open a Pull Request

---

## License

Distributed under the [MIT License](LICENSE).

---

<div align="center">

Built with care by [**Superstack**](https://www.superstack.in/) &nbsp;·&nbsp; Developer: **Atanu Kumar Pal**  
Support: [hello@superstack.in](mailto:hello@superstack.in)

</div>
