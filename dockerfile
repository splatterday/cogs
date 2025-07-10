# --- STAGE 1: install & build ---
FROM node:18-alpine AS builder
WORKDIR /app

# copy only the package manifests you actually have
COPY package*.json ./

# install exact deps
RUN npm ci

# copy the rest & build
COPY . .
RUN npm run build

# --- STAGE 2: runtime image ---
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

# bring in your build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
