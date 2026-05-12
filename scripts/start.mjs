#!/usr/bin/env node
/**
 * Mpath — Production Start Script
 * Displays enterprise CLI banner and launches the preview server with minimal output.
 */

import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Load metadata ──────────────────────────────────────────────────────────────
let version = 'v1.0.0';
let owner   = 'Superstack';
let appDate = '';

try {
  const info = JSON.parse(readFileSync(path.join(ROOT, 'src/version.json'), 'utf8'));
  if (info.version) version = info.version;
  if (info.owner)   owner   = info.owner;
  if (info.date)    appDate = info.date;
} catch { /* use defaults */ }

// ── ANSI colour helpers ────────────────────────────────────────────────────────
const R   = '\x1b[0m';
const B   = '\x1b[1m';
const DIM = '\x1b[2m';
const CY  = '\x1b[36m';    // cyan (borders)
const BCY = '\x1b[96m';    // bright cyan (logo)
const BBL = '\x1b[94m';    // bright blue ("IQ")
const BGN = '\x1b[92m';    // bright green (URL / version)
const YLW = '\x1b[93m';    // yellow (warnings)
const WHT = '\x1b[97m';    // white (info values)

// ── Banner printer ─────────────────────────────────────────────────────────────
function printBanner(url = '') {
  // Hard-clear the terminal
  process.stdout.write('\x1Bc');

  const div = `${CY}╠═══════════════════════════════════════════════════════════════════╣${R}`;
  const top = `${CY}╔═══════════════════════════════════════════════════════════════════╗${R}`;
  const bot = `${CY}╚═══════════════════════════════════════════════════════════════════╝${R}`;
  const L   = `${CY}║${R}`;           // left border only (no right – avoids ANSI width issues)

  const urlLine = url
    ? `${L}   ${B}${BGN}➜${R}  App running:  ${B}${BCY}${url}${R}`
    : `${L}   ${YLW}⟳${R}  Starting server, please wait…`;

  const lines = [
    '',
    top,
    `${L}`,
    `${L}   ${B}${BCY}███╗   ███╗██████╗  █████╗ ████████╗██╗  ██╗${R}`,
    `${L}   ${B}${BCY}████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║${R}`,
    `${L}   ${B}${BCY}██╔████╔██║██████╔╝███████║   ██║   ███████║${R}`,
    `${L}   ${B}${BCY}██║╚██╔╝██║██╔═══╝ ██╔══██║   ██║   ██╔══██║${R}`,
    `${L}   ${B}${BCY}██║ ╚═╝ ██║██║     ██║  ██║   ██║   ██║  ██║${R}  ${B}${BBL}IQ${R}`,
    `${L}   ${B}${BCY}╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝${R}`,
    `${L}`,
    `${L}   ${DIM}Multipath Intelligence Platform  ·  SAN Fabric Analytics${R}`,
    `${L}   ${DIM}Advanced SAN zone validation, topology mapping & fabric intelligence${R}`,
    `${L}`,
    div,
    `${L}   ${DIM}Version${R}    ${BGN}${version}${R}        ${DIM}Platform${R}  ${WHT}${process.platform}${R}`,
    `${L}   ${DIM}Node${R}       ${WHT}${process.version}${R}      ${DIM}Released${R}  ${WHT}${appDate || 'N/A'}${R}`,
    div,
    `${L}   ${DIM}Built by${R}   ${B}${WHT}Superstack${R}  ${DIM}https://www.superstack.in/${R}`,
    `${L}   ${DIM}Developer${R}  ${WHT}Atanu Kumar Pal${R}`,
    `${L}   ${DIM}Support${R}    ${WHT}hello@superstack.in${R}`,
    div,
    `${L}`,
    urlLine,
    `${L}`,
    bot,
    '',
  ];

  process.stdout.write(lines.join('\n') + '\n');
}

// ── Guard: ensure dist/ exists ────────────────────────────────────────────────
if (!existsSync(path.join(ROOT, 'dist'))) {
  process.stdout.write('\x1Bc');
  console.error(`\n  ${YLW}!${R}  Production build not found.\n`);
  console.error(`  Run ${WHT}npm run build${R} first, then ${WHT}npm start${R}.\n`);
  process.exit(1);
}

// ── Show "starting" banner immediately ────────────────────────────────────────
printBanner();

// ── Determine port ────────────────────────────────────────────────────────────
const port = process.env.PORT || '4173';

// ── Spawn vite preview (suppress all its own output) ─────────────────────────
const vite = spawn(
  'npx',
  ['vite', 'preview', '--host', '--port', port],
  {
    cwd: ROOT,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' },
  }
);

let serverReady = false;

function parseViteOutput(data) {
  const text = data.toString();

  // Capture local URL from vite preview output
  // Handles: "Local:   http://localhost:4173/"
  const match = text.match(/Local:\s+(https?:\/\/[^\s\n]+)/);
  if (match && !serverReady) {
    serverReady = true;
    // Trim trailing slash for clean display
    const url = match[1].replace(/\/$/, '');
    printBanner(url);
  }
}

vite.stdout.on('data', parseViteOutput);
vite.stderr.on('data', parseViteOutput);

vite.on('close', code => {
  if (code !== 0 && code !== null) {
    process.stderr.write(`\n  ${YLW}!${R}  Server exited with code ${code}\n\n`);
  }
  process.exit(code ?? 0);
});

// ── Forward OS signals cleanly ────────────────────────────────────────────────
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    vite.kill(sig);
  });
}
