# ─────────────────────────────────────────────────────────────────────────────
#  Mpath — Docker Production Image
#  Multi-stage build: Node (builder) → nginx:alpine (runtime)
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

LABEL maintainer="Superstack <hello@superstack.dev>"
LABEL org.opencontainers.image.title="Mpath"
LABEL org.opencontainers.image.description="Multipath Intelligence Platform — SAN Fabric Analytics"
LABEL org.opencontainers.image.version="1.0.1"

WORKDIR /app

# Install dependencies first (layer cache friendly)
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Production server ────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY deployment/docker/nginx.conf /etc/nginx/conf.d/mpath.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
