FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS production
RUN apk add --no-cache dumb-init
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -u 1001 -S nodeuser -G nodejs

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs . .

ENV NODE_ENV=production
ENV PORT=5000

USER nodeuser
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/api/health || exit 1

CMD ["dumb-init", "node", "server.js"]
