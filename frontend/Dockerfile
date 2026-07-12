# ══════════════════════════════════════════════════════════════════
# Stage 1 — Dependencies
# Install only production dependencies first (better layer caching)
# If package.json does not change, this layer is cached
# ══════════════════════════════════════════════════════════════════
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files first — Docker caches this layer
# Only re-runs npm ci when package.json or lock file changes
COPY package.json package-lock.json ./

# npm ci = clean install, faster than npm install, uses lock file exactly
# --frozen-lockfile ensures no version drift
RUN npm ci

# ══════════════════════════════════════════════════════════════════
# Stage 2 — Builder
# Build the production React/Vite bundle
# ══════════════════════════════════════════════════════════════════
FROM node:22-alpine AS builder

WORKDIR /app

# Copy installed node_modules from deps stage
# Avoids reinstalling — just reuses cached deps
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Build args for environment variables at build time
# These get baked into the static JS bundle
ARG VITE_API_URL=http://localhost:5001/api
ENV VITE_API_URL=$VITE_API_URL

# Run Vite build — outputs to /app/dist
RUN npm run build

# ══════════════════════════════════════════════════════════════════
# Stage 3 — Production
# Serve the built files with nginx
# Final image has NO node, NO source code, NO node_modules
# Only nginx + your built dist folder
# Result: tiny image ~25MB instead of ~400MB
# ══════════════════════════════════════════════════════════════════
FROM nginx:1.27-alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

USER appuser

EXPOSE 80

# Healthcheck — Docker and Kubernetes use this
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
