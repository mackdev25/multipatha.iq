# =============================================================================
#  mpathctl — Makefile
#  Builds native binaries for all supported platforms.
# =============================================================================

VERSION     ?= v1.0.1
LDFLAGS      = -s -w -X main.AppVersion=$(VERSION)
BUILD_DIR    = dist
GO           = go
BINARY       = mpathctl

.PHONY: all clean build-local \
        build-linux-amd64 build-linux-arm64 \
        build-darwin-amd64 build-darwin-arm64 \
        build-windows-amd64 build-windows-386 \
        release

# ── Default: build for the current OS ─────────────────────────────────────────
all: build-local

build-local:
	$(GO) build -ldflags="$(LDFLAGS)" -o $(BINARY) .
	@echo "  ✔  $(BINARY) built for $(shell go env GOOS)/$(shell go env GOARCH)"

# ── Cross-compile targets ──────────────────────────────────────────────────────
build-linux-amd64:
	GOOS=linux   GOARCH=amd64  $(GO) build -ldflags="$(LDFLAGS)" -o $(BUILD_DIR)/$(BINARY)-linux-amd64   .

build-linux-arm64:
	GOOS=linux   GOARCH=arm64  $(GO) build -ldflags="$(LDFLAGS)" -o $(BUILD_DIR)/$(BINARY)-linux-arm64   .

build-darwin-amd64:
	GOOS=darwin  GOARCH=amd64  $(GO) build -ldflags="$(LDFLAGS)" -o $(BUILD_DIR)/$(BINARY)-darwin-amd64  .

build-darwin-arm64:
	GOOS=darwin  GOARCH=arm64  $(GO) build -ldflags="$(LDFLAGS)" -o $(BUILD_DIR)/$(BINARY)-darwin-arm64  .

build-windows-amd64:
	GOOS=windows GOARCH=amd64  $(GO) build -ldflags="$(LDFLAGS)" -o $(BUILD_DIR)/$(BINARY)-windows-amd64.exe .

build-windows-386:
	GOOS=windows GOARCH=386    $(GO) build -ldflags="$(LDFLAGS)" -o $(BUILD_DIR)/$(BINARY)-windows-386.exe   .

# ── Release: build all platforms ──────────────────────────────────────────────
release: clean
	@mkdir -p $(BUILD_DIR)
	@$(MAKE) build-linux-amd64 build-linux-arm64 \
	         build-darwin-amd64 build-darwin-arm64 \
	         build-windows-amd64 build-windows-386
	@echo ""
	@echo "  ✔  All binaries built in $(BUILD_DIR)/"
	@ls -lh $(BUILD_DIR)/

clean:
	rm -rf $(BUILD_DIR) $(BINARY) $(BINARY).exe
