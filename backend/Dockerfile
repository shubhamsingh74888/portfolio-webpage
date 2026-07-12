# ══════════════════════════════════════════════════════════════════
# Stage 1 — Dependencies
# Install ALL dependencies including devDependencies
# Needed for any build steps
# ══════════════════════════════════════════════════════════════════
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files only — layer cache trick
COPY package.json package-lock.json ./

# Install all deps (including dev) for potential build steps
RUN npm ci

# ══════════════════════════════════════════════════════════════════
# Stage 2 — Production Dependencies Only
# Separate stage to get ONLY production deps
# Excludes nodemon and other dev tools
# ══════════════════════════════════════════════════════════════════
FROM node:18-alpine AS prod-deps

WORKDIR /app

COPY package.json package-lock.json ./

# --omit=dev skips devDependencies (nodemon etc)
# Production image will be smaller
RUN npm ci --omit=dev

# ══════════════════════════════════════════════════════════════════
# Stage 3 — Production
# Final lean image with only what is needed to run
# No devDependencies, no package manager cache
# ══════════════════════════════════════════════════════════════════
FROM node:18-alpine AS production

# Install dumb-init — proper signal handling in containers
# Without this, Node.js does not receive SIGTERM properly
# Causes slow shutdowns and zombie processes
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user for security
# Never run Node.js as root in production
RUN addgroup -g 1001 -S nodejs && \
    adduser -u 1001 -S nodeuser -G nodejs

# Copy production dependencies from prod-deps stage
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy application source code
# .dockerignore prevents copying node_modules, .env, etc
COPY --chown=nodeuser:nodejs . .

# Switch to non-root user
USER nodeuser

EXPOSE 5000

# Healthcheck — hits the /api/health endpoint we know exists in server.js
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

# dumb-init as PID 1 — handles signals correctly
# node server.js is the actual app
CMD ["dumb-init", "node", "server.js"]
