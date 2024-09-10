FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --registry=https://registry.npmmirror.com
RUN npx prisma generate
RUN pnpm run build

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY prisma ./prisma/
COPY prod-startup.sh ./prod-startup.sh

ENV NEXT_TELEMETRY_DISABLED 1

RUN chmod +x /app/prod-startup.sh

ENTRYPOINT ["sh", "/app/prod-startup.sh"]