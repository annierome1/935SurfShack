# 1) Use a small Node base
FROM node:18-alpine

# 2) Set working dir
WORKDIR /app

# 3) Install deps
COPY package*.json ./
RUN npm install

# 4) Copy source & build
COPY . .
RUN npm run build

# 5) Expose and start on 0.0.0.0:3000
EXPOSE 3005
CMD ["npx", "next", "start", "-p", "3005", "-H", "0.0.0.0"]
