# Stage 1: Builder
FROM node:20.18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# TODO: use nginx for better performance
# Stage 2: Creating production
FROM node:20.18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run" ,"start"]
