FROM node:20-alpine AS builder

RUN apk update && apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --omit=dev

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]