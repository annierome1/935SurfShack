# ─── Stage 1: Build the Studio ───────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build    # this runs "sanity build" under the hood

# ─── Stage 2: Serve with Nginx ───────────────────────────────────────────────
FROM nginx:stable-alpine
# Copy the generated static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
