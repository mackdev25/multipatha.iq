// mpathctl — MultipathIQ Control CLI
// Enterprise-grade command-line tool for managing the MultipathIQ server.
//
// Build:
//   go build -ldflags="-s -w -X main.AppVersion=v1.0.1" -o mpathctl .
//
// Supported commands:
//   mpathctl status | health | start | stop | restart | logs | doctor | expose | version | uninstall | help

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"time"
)

// ── Build-time injectable version ─────────────────────────────────────────────
var AppVersion = "v1.0.1"

// ── ANSI colours ───────────────────────────────────────────────────────────────
const (
	reset  = "\033[0m"
	bold   = "\033[1m"
	dim    = "\033[2m"
	red    = "\033[31m"
	green  = "\033[32m"
	yellow = "\033[33m"
	cyan   = "\033[36m"
	bCyan  = "\033[96m"
	white  = "\033[97m"
)

// Disable colour on Windows unless WT_SESSION / ANSICON is set.
func initColours() {
	if runtime.GOOS == "windows" {
		if os.Getenv("WT_SESSION") == "" && os.Getenv("ANSICON") == "" {
			// Leave all colour consts as empty — handled via build tag alternative;
			// here we simply proceed; modern Windows Terminal supports ANSI fine.
		}
	}
}

// ── Config ─────────────────────────────────────────────────────────────────────
type Config struct {
	InstallDir  string `json:"installDir"`
	Port        int    `json:"port"`
	Version     string `json:"version"`
	InstalledAt string `json:"installedAt"`
}

func configDir() string {
	home, _ := os.UserHomeDir()
	return filepath.Join(home, ".mpathiq")
}

func pidFile() string { return filepath.Join(configDir(), "server.pid") }
func logFile() string { return filepath.Join(configDir(), "logs", "server.log") }
func cfgFile() string { return filepath.Join(configDir(), "config.json") }

func loadConfig() (*Config, error) {
	data, err := os.ReadFile(cfgFile())
	if err != nil {
		return nil, fmt.Errorf("config not found at %s — run the installer first", cfgFile())
	}
	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("invalid config: %w", err)
	}
	if cfg.Port == 0 {
		cfg.Port = 4173
	}
	return &cfg, nil
}

// ── PID helpers ────────────────────────────────────────────────────────────────
func readPID() (int, error) {
	data, err := os.ReadFile(pidFile())
	if err != nil {
		return 0, err
	}
	return strconv.Atoi(strings.TrimSpace(string(data)))
}

func isRunning(pid int) bool {
	proc, err := os.FindProcess(pid)
	if err != nil {
		return false
	}
	// On Unix, Signal 0 checks existence without killing.
	if runtime.GOOS != "windows" {
		return proc.Signal(os.Signal(nil)) == nil // nolint:staticcheck
	}
	// Windows: try opening the process
	return proc != nil
}

// ── Banner ─────────────────────────────────────────────────────────────────────
func printBanner() {
	fmt.Println()
	fmt.Printf("%s╔═══════════════════════════════════════════════════════════════════╗%s\n", cyan, reset)
	fmt.Printf("%s║%s\n", cyan, reset)
	fmt.Printf("%s║%s   %s%s███╗   ███╗██████╗  █████╗ ████████╗██╗  ██╗%s\n", cyan, reset, bold, bCyan, reset)
	fmt.Printf("%s║%s   %s%s████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║%s\n", cyan, reset, bold, bCyan, reset)
	fmt.Printf("%s║%s   %s%s██╔████╔██║██████╔╝███████║   ██║   ███████║%s\n", cyan, reset, bold, bCyan, reset)
	fmt.Printf("%s║%s   %s%s██║╚██╔╝██║██╔═══╝ ██╔══██║   ██║   ██╔══██║%s\n", cyan, reset, bold, bCyan, reset)
	fmt.Printf("%s║%s   %s%s██║ ╚═╝ ██║██║     ██║  ██║   ██║   ██║  ██║%s  %sIQ%s\n", cyan, reset, bold, bCyan, reset, bold, reset)
	fmt.Printf("%s║%s   %s%s╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝%s\n", cyan, reset, bold, bCyan, reset)
	fmt.Printf("%s║%s\n", cyan, reset)
	fmt.Printf("%s║%s   %sMultipath Intelligence Platform  ·  SAN Fabric Analytics%s\n", cyan, reset, dim, reset)
	fmt.Printf("%s║%s   %sAdvanced SAN zone validation, topology mapping & fabric intelligence%s\n", cyan, reset, dim, reset)
	fmt.Printf("%s║%s\n", cyan, reset)
	fmt.Printf("%s╠═══════════════════════════════════════════════════════════════════╣%s\n", cyan, reset)
	fmt.Printf("%s║%s   %sVersion%s    %s%-10s%s   %sPlatform%s  %s%s/%s%s\n",
		cyan, reset, dim, reset, bCyan, AppVersion, reset, dim, reset, white, runtime.GOOS, runtime.GOARCH, reset)
	fmt.Printf("%s║%s   %sGo%s         %s%-10s%s\n",
		cyan, reset, dim, reset, white, runtime.Version(), reset)
	fmt.Printf("%s╠═══════════════════════════════════════════════════════════════════╣%s\n", cyan, reset)
	fmt.Printf("%s║%s   %sBuilt by%s   %s%-18s%s  %shttps://www.superstack.in/%s\n",
		cyan, reset, dim, reset, bold+white, "Superstack", reset, dim, reset)
	fmt.Printf("%s║%s   %sDeveloper%s  %sAtanu Kumar Pal%s\n", cyan, reset, dim, reset, white, reset)
	fmt.Printf("%s║%s   %sSupport%s    %shello@superstack.in%s\n", cyan, reset, dim, reset, white, reset)
	fmt.Printf("%s╚═══════════════════════════════════════════════════════════════════╝%s\n", cyan, reset)
	fmt.Println()
}

// ── Commands ───────────────────────────────────────────────────────────────────

func cmdStatus() {
	printBanner()
	cfg, err := loadConfig()
	if err != nil {
		fmt.Printf("  %s✖%s  %s\n\n", red, reset, err)
		os.Exit(1)
	}

	pid, pidErr := readPID()
	running := pidErr == nil && isRunning(pid)

	stateStr := fmt.Sprintf("%s● Running%s", green, reset)
	stateIcon := "●"
	stateCol := green
	if !running {
		stateStr = fmt.Sprintf("%s○ Stopped%s", red, reset)
		stateIcon = "○"
		stateCol = red
	}
	_ = stateStr

	fmt.Printf("  %sStatus%s\n", bold, reset)
	fmt.Printf("  %s══════════════════════════════════════%s\n", dim, reset)
	fmt.Printf("  State        %s%s %s%s\n", stateCol, stateIcon, map[bool]string{true: "Running", false: "Stopped"}[running], reset)
	if running {
		fmt.Printf("  PID          %s%d%s\n", white, pid, reset)
	}
	fmt.Printf("  Version      %s%s%s\n", bCyan, cfg.Version, reset)
	fmt.Printf("  Port         %s%d%s\n", white, cfg.Port, reset)
	fmt.Printf("  Install Dir  %s%s%s\n", dim, cfg.InstallDir, reset)
	fmt.Printf("  Config       %s%s%s\n", dim, cfgFile(), reset)
	fmt.Printf("  Logs         %s%s%s\n", dim, logFile(), reset)
	fmt.Println()
}

func cmdHealth() {
	cfg, err := loadConfig()
	if err != nil {
		fmt.Printf("  %s✖%s  %s\n", red, reset, err)
		os.Exit(1)
	}

	url := fmt.Sprintf("http://localhost:%d/health", cfg.Port)
	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(url) //nolint:noctx
	if err != nil {
		fmt.Printf("  %s✖%s  Health check FAILED: %v\n", red, reset, err)
		os.Exit(1)
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)

	if resp.StatusCode == 200 {
		fmt.Printf("  %s✔%s  Health check %sPASSED%s  HTTP %d  %s\n",
			green, reset, green, reset, resp.StatusCode, strings.TrimSpace(string(body)))
	} else {
		fmt.Printf("  %s!%s  Health check returned HTTP %d\n", yellow, reset, resp.StatusCode)
		os.Exit(1)
	}
}

func cmdStart() {
	cfg, err := loadConfig()
	if err != nil {
		fmt.Printf("  %s✖%s  %s\n", red, reset, err)
		os.Exit(1)
	}

	// Check if already running
	if pid, pidErr := readPID(); pidErr == nil && isRunning(pid) {
		fmt.Printf("  %s!%s  Server is already running (PID %d)\n", yellow, reset, pid)
		return
	}

	lf, _ := os.OpenFile(logFile(), os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	defer lf.Close()

	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("npm.cmd", "start")
	} else {
		cmd = exec.Command("npm", "start")
	}
	cmd.Dir = cfg.InstallDir
	cmd.Stdout = lf
	cmd.Stderr = lf
	cmd.Env = append(os.Environ(), fmt.Sprintf("PORT=%d", cfg.Port))

	if err := cmd.Start(); err != nil {
		fmt.Printf("  %s✖%s  Failed to start server: %v\n", red, reset, err)
		os.Exit(1)
	}

	_ = os.WriteFile(pidFile(), []byte(strconv.Itoa(cmd.Process.Pid)), 0644)
	fmt.Printf("  %s✔%s  Server started (PID %d)\n", green, reset, cmd.Process.Pid)
	fmt.Printf("  %s➜%s  App running:  %s%shttp://localhost:%d%s\n\n",
		green, reset, bold, bCyan, cfg.Port, reset)
}

func cmdStop() {
	pid, err := readPID()
	if err != nil {
		fmt.Printf("  %s!%s  No PID file found — server may not be running\n", yellow, reset)
		return
	}

	proc, err := os.FindProcess(pid)
	if err != nil || !isRunning(pid) {
		fmt.Printf("  %s!%s  Process %d is not running\n", yellow, reset, pid)
		_ = os.Remove(pidFile())
		return
	}

	if err := proc.Kill(); err != nil {
		fmt.Printf("  %s✖%s  Failed to stop process %d: %v\n", red, reset, pid, err)
		os.Exit(1)
	}

	_ = os.Remove(pidFile())
	fmt.Printf("  %s✔%s  Server stopped (PID %d)\n\n", green, reset, pid)
}

func cmdRestart() {
	fmt.Printf("  %s·%s  Restarting server...\n", cyan, reset)
	cmdStop()
	time.Sleep(1 * time.Second)
	cmdStart()
}

func cmdLogs() {
	lf := logFile()
	if _, err := os.Stat(lf); os.IsNotExist(err) {
		fmt.Printf("  %s!%s  Log file not found: %s\n", yellow, reset, lf)
		return
	}

	fmt.Printf("  %s%s%s\n\n", dim, lf, reset)

	// Tail last 50 lines
	data, err := os.ReadFile(lf)
	if err != nil {
		fmt.Printf("  %s✖%s  Cannot read log file: %v\n", red, reset, err)
		os.Exit(1)
	}

	lines := strings.Split(string(data), "\n")
	start := 0
	if len(lines) > 50 {
		start = len(lines) - 50
	}
	for _, line := range lines[start:] {
		fmt.Println(" ", line)
	}
}

func cmdDoctor() {
	fmt.Printf("\n  %s%sDiagnostics%s\n\n", bold, cyan, reset)
	check := func(name, cmd string, args ...string) {
		out, err := exec.Command(cmd, args...).Output()
		if err != nil {
			fmt.Printf("  %s✖%s  %-14s not found\n", red, reset, name)
		} else {
			fmt.Printf("  %s✔%s  %-14s %s\n", green, reset, name, strings.TrimSpace(string(out)))
		}
	}

	check("node", "node", "--version")
	check("npm", "npm", "--version")
	check("git", "git", "--version")

	cfg, err := loadConfig()
	if err != nil {
		fmt.Printf("  %s!%s  Config not found — run the installer\n\n", yellow, reset)
		return
	}

	if _, err := os.Stat(cfg.InstallDir); err != nil {
		fmt.Printf("  %s✖%s  Install dir missing: %s\n", red, reset, cfg.InstallDir)
	} else {
		fmt.Printf("  %s✔%s  Install dir        %s%s%s\n", green, reset, dim, cfg.InstallDir, reset)
	}

	if _, err := os.Stat(filepath.Join(cfg.InstallDir, "dist")); err != nil {
		fmt.Printf("  %s✖%s  dist/ not found — run: npm run build\n", red, reset)
	} else {
		fmt.Printf("  %s✔%s  dist/              present\n", green, reset)
	}

	fmt.Println()
}

func cmdExpose() {
	cfg, err := loadConfig()
	if err != nil {
		fmt.Printf("  %s✖%s  %s\n", red, reset, err)
		os.Exit(1)
	}

	fmt.Printf("\n  %s%sNetwork Access URLs%s\n\n", bold, cyan, reset)
	fmt.Printf("  %s➜%s  Local     %s%shttp://localhost:%d%s\n",
		green, reset, bold, bCyan, cfg.Port, reset)

	// Best-effort: enumerate network interfaces
	out, err := exec.Command("hostname", "-I").Output()
	if err == nil {
		for _, ip := range strings.Fields(string(out)) {
			if strings.Contains(ip, ".") { // IPv4 only
				fmt.Printf("  %s➜%s  Network   %s%shttp://%s:%d%s\n",
					green, reset, bold, bCyan, ip, cfg.Port, reset)
			}
		}
	}
	fmt.Println()
}

func cmdVersion() {
	printBanner()
	fmt.Printf("  Version    %s%s%s\n", bCyan, AppVersion, reset)
	fmt.Printf("  Platform   %s%s/%s%s\n", white, runtime.GOOS, runtime.GOARCH, reset)
	fmt.Printf("  Go         %s%s%s\n\n", dim, runtime.Version(), reset)
}

func cmdUninstall() {
	cfg, cfgErr := loadConfig()

	fmt.Printf("  %s!%s  This will stop the server and remove all MultipathIQ files.\n", yellow, reset)
	fmt.Printf("  Type %s\"yes\"%s to confirm: ", bold, reset)

	var confirm string
	fmt.Scanln(&confirm) //nolint:errcheck
	if confirm != "yes" {
		fmt.Printf("  %s·%s  Uninstall cancelled.\n\n", cyan, reset)
		return
	}

	// Stop server
	if pid, pidErr := readPID(); pidErr == nil && isRunning(pid) {
		if proc, err := os.FindProcess(pid); err == nil {
			_ = proc.Kill()
		}
	}

	// Remove install dir
	if cfgErr == nil {
		if err := os.RemoveAll(cfg.InstallDir); err != nil {
			fmt.Printf("  %s!%s  Could not remove %s: %v\n", yellow, reset, cfg.InstallDir, err)
		} else {
			fmt.Printf("  %s✔%s  Removed %s\n", green, reset, cfg.InstallDir)
		}
	}

	// Remove config dir
	if err := os.RemoveAll(configDir()); err != nil {
		fmt.Printf("  %s!%s  Could not remove %s: %v\n", yellow, reset, configDir(), err)
	} else {
		fmt.Printf("  %s✔%s  Removed %s\n", green, reset, configDir())
	}

	// Remove binary
	home, _ := os.UserHomeDir()
	binPath := filepath.Join(home, ".local", "bin", "mpathctl")
	if runtime.GOOS == "windows" {
		binPath += ".exe"
	}
	if err := os.Remove(binPath); err == nil {
		fmt.Printf("  %s✔%s  Removed %s\n", green, reset, binPath)
	}

	fmt.Printf("\n  %s✔%s  MultipathIQ uninstalled successfully.\n\n", green, reset)
}

func cmdHelp() {
	printBanner()
	cmds := []struct{ cmd, desc string }{
		{"status", "Show server status and metadata"},
		{"health", "HTTP health check against the running server"},
		{"start", "Start the server in the background"},
		{"stop", "Stop the server"},
		{"restart", "Restart the server"},
		{"logs", "View the last 50 lines of the server log"},
		{"doctor", "Diagnose Node.js, npm, git, and install integrity"},
		{"expose", "Print local + network access URLs"},
		{"version", "Display version information"},
		{"uninstall", "Stop server and remove all MultipathIQ files"},
		{"help", "Show this help message"},
	}

	fmt.Printf("  %s%smpathctl — MultipathIQ Control CLI%s\n\n", bold, white, reset)
	fmt.Printf("  %sUsage:%s  mpathctl <command>\n\n", dim, reset)
	fmt.Printf("  %sCommands:%s\n\n", dim, reset)
	for _, c := range cmds {
		fmt.Printf("    %s%-12s%s  %s%s%s\n", bold, c.cmd, reset, dim, c.desc, reset)
	}
	fmt.Println()
}

// ── Entry point ────────────────────────────────────────────────────────────────
func main() {
	initColours()

	if len(os.Args) < 2 {
		cmdHelp()
		os.Exit(0)
	}

	switch os.Args[1] {
	case "status":
		cmdStatus()
	case "health":
		cmdHealth()
	case "start":
		cmdStart()
	case "stop":
		cmdStop()
	case "restart":
		cmdRestart()
	case "logs":
		cmdLogs()
	case "doctor":
		cmdDoctor()
	case "expose":
		cmdExpose()
	case "version", "-v", "--version":
		cmdVersion()
	case "uninstall":
		cmdUninstall()
	case "help", "-h", "--help":
		cmdHelp()
	default:
		fmt.Printf("\n  %s!%s  Unknown command: %s\n", yellow, reset, os.Args[1])
		fmt.Printf("  Run %smpathctl help%s for available commands.\n\n", bold, reset)
		os.Exit(1)
	}
}
