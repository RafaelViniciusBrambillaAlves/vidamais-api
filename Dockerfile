# Dockerfile
FROM node:18-alpine AS base

WORKDIR /app

# Etapa de construção
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de produção
FROM base AS production
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]