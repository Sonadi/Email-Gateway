# Build stage
FROM node:18-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# Run stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app .

EXPOSE 5045
CMD ["node", "servers.js"]
