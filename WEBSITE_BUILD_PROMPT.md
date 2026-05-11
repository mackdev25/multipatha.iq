# Prompt: Build A Mature, Professional Website For This Project

Use this prompt with an AI coding assistant to generate the full website.

---

You are a senior product designer and frontend engineer.
Build a polished, production-ready marketing website for this project:

- Product name: MultipathIQ
- Repository/project name: Brocade Zone Validator (ZoneAssure)
- Current version: v1.0.1
- Release date: 10-MAY-2026
- Developer: Atanu Kumar Pal
- Owner: Macklabs

The website must feel mature, trustworthy, and enterprise-ready.

## 1) Design Direction (match the attached reference image)

Design style requirements:

- Use a clean light theme with a subtle grid background texture across hero and major sections.
- Keep a highly professional top navigation with these tabs: Home, Features, Demo, Deployment.
- Include a compact brand/logo area on the left and action buttons on the right.
- Hero should be bold, minimal, and typography-first with a strong one-line value proposition.
- Use a modern neutral palette (slate/gray/black with one restrained accent color).
- Buttons: strong primary (dark) and secondary (outlined/light).
- Use generous whitespace, balanced section rhythm, and crisp card components.
- Avoid flashy gradients, loud colors, and playful startup styling.
- Must be fully responsive for desktop/tablet/mobile.

Visual behavior:

- Smooth section reveal animations.
- Subtle hover and focus states.
- Sticky top navbar.
- Active section indicator in nav.

## 2) Website Structure

Build a complete multi-section landing site with these main tabs/sections:

1. Home
2. Features
3. Demo
4. Deployment

Also include:

- About summary block
- Architecture snapshot
- Data format requirements
- Security and privacy section
- Version/changelog highlights
- Footer with legal links and project metadata

## 3) Core Messaging (write copy in a mature enterprise tone)

Primary value proposition:

"Validate SAN multipathing with confidence. Detect blind spots before they become outages."

Secondary message:

"MultipathIQ analyzes Brocade fabric exports locally in your browser, verifies host path health across FAB-A and FAB-B, and delivers actionable validation, observability, and export-ready reports."

Key trust points:

- Client-side processing for data control
- Enterprise compliance-friendly validation modes
- Fast onboarding with template-based upload
- Rich visual diagnostics (topology, matrix, dependency)

## 4) Project Details To Include (important)

The website must accurately present these capabilities:

### A) Validation Engine

- Reads Excel/CSV SAN fabric datasets.
- Required fields include: Fabric, Alias, Logged In.
- Typical accepted fabric values: FAB-A and FAB-B.
- Removes duplicate rows using composite key:
  - Fabric + Alias + Member WWN / D,P
- Extracts host name from alias by removing the last underscore suffix.
- Computes per-host login health for both fabrics.
- Final statuses:
  - Good
  - FAB-A Is BAD
  - FAB-B Is BAD
  - Both FABs Are BAD

### B) Validation Modes

- Multipath Mode:
  - Per fabric status OK when Logged In >= 1
  - Reliable multipath signal when both fabrics have >= 2 logged-in paths
- Compliance Mode:
  - Rule-based checks using configurable conditions
  - Example profiles:
    - loggedIn=1, notLoggedIn=0 (Single Path: ESXi/RHEL)
    - loggedIn=2, notLoggedIn=2 (AIX profile)

### C) Results and Reporting

- Interactive result table with search and filters.
- Summary metrics:
  - Total hosts
  - Good
  - Partial issues
  - Both bad
  - Duplicate rows removed
- Export report to Excel with status-aware color coding.
- Include WWN-level login details in exported file.

### D) Observability and Visualization

- Observability dashboard with health score and distribution.
- Path activity comparison by fabric.
- SAN topology overview.
- Connection matrix.
- Dependency map (server to fabric/storage relationships).
- Validation flow logic visualization.

### E) Documentation and Operations Positioning

Show that the platform includes documentation topics such as:

- Platform fundamentals
- System requirements
- Deployment methods
- Installation and troubleshooting
- Quick start and output interpretation
- Validation data capture guidance
- Observability setup
- CLI/service guidance

## 5) Section-by-Section Content Requirements

### Home

Include:

- Hero headline + subheadline + two CTAs
  - Primary CTA: Try Demo Platform
  - Secondary CTA: View on GitHub
- One concise credibility strip (version, contributors/community, release cadence)
- Short "Why this matters" block focused on SAN reliability and outage prevention

### Features

Create professional feature cards for:

- Fabric Path Validation
- Compliance Rule Engine
- Duplicate-Aware Data Processing
- Observability Dashboard
- Topology and Matrix Views
- Excel Export Reporting
- Client-Side Data Security
- Documentation-First Onboarding

### Demo

Include:

- Product walkthrough steps:
  1) Upload spreadsheet
  2) Validate
  3) Analyze health and issues
  4) Export report
- Accepted file types and required columns
- Optional screenshot/video placeholder area
- "Download sample template" style action

### Deployment

Include:

- Deployment options:
  - Local self-hosted deployment
  - Internal enterprise environment
  - Static frontend hosting for UI
- Technical stack summary:
  - React + TypeScript + Vite
  - Tailwind CSS + MUI
  - XLSX and File Saver integration
  - Recharts for observability visuals
- Environment and setup overview:
  - Node.js prerequisites
  - Install, run, build commands
- Security note emphasizing local browser-side processing

## 6) Technical Build Requirements

- Use React + TypeScript + Vite.
- Use semantic HTML and accessible components.
- Add SEO-friendly metadata and social preview tags.
- Keep CLS low and typography stable.
- Use reusable components and clean folder structure.
- Include mobile navigation drawer for small screens.
- Use smooth scrolling to sections.
- Add clear empty/error states for demo placeholders.

## 7) Quality Bar

The result must look like a real SaaS enterprise product page, not a generic template.

Must-have quality checks:

- Pixel-clean spacing and alignment
- Strong desktop hero composition
- Excellent mobile layout
- High contrast and readable typography
- No lorem ipsum
- No broken links or placeholder nonsense text

## 8) Final Deliverables

Generate all code needed for:

- Home/Features/Demo/Deployment website sections
- Shared layout components (Navbar, Footer, Section wrappers)
- Reusable CTA/button styles
- Responsive and accessible behavior
- Professional, complete copy specific to this project

If any project detail is missing, infer it conservatively from the above constraints and keep the tone enterprise-professional.
