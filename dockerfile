# ─── Build stage ────────────────────────────────────────
FROM node:18-alpine AS builder
ARG DISCOGS_PERSONAL_TOKEN
ARG DISCOGS_USERNAME
WORKDIR /app

# 1) Install everything (including sass/postcss/tailwind)
COPY package*.json ./
RUN npm ci

# 2) Make your token available at build time
ENV DISCOGS_PERSONAL_TOKEN=${DISCOGS_PERSONAL_TOKEN}
ENV DISCOGS_USERNAME=${DISCOGS_USERNAME}

# 3) Copy source, build it (Tailwind/SCSS runs here)
COPY . .
RUN npm run build

# ─── Runtime stage ──────────────────────────────────────
FROM node:18-alpine AS runner
ARG DISCOGS_PERSONAL_TOKEN
ARG DISCOGS_USERNAME
WORKDIR /app
ENV NODE_ENV=production

# 4) Only install production deps
COPY package*.json ./
RUN npm ci --only=production

# 5) Bring in the compiled output and your token
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
ENV DISCOGS_PERSONAL_TOKEN=${DISCOGS_PERSONAL_TOKEN}
ENV DISCOGS_USERNAME=${DISCOGS_USERNAME}

EXPOSE 3000
CMD ["npm", "start"]
