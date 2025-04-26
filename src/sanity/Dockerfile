# Dockerfile for Sanity Studio (located at src/sanity)

# ─── Stage 1: Build the Studio ─────────────────────────────────────────────
FROM node:18-bullseye-slim AS builder
# Install build tools needed for native modules
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# 1) Copy only the Studio’s package files
COPY package.json package-lock.json ./

# 2) Install dependencies
RUN npm install

# 3) Copy all Studio source code
COPY . ./

# 4) Build the studio (outputs to /app/dist)
RUN npm run build

# ─── Stage 2: Serve with Nginx ───────────────────────────────────────────── 
FROM nginx:stable-alpine

# Copy static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
