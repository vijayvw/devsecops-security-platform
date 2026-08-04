FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --spider -q http://localhost:4000/health || exit 1

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

