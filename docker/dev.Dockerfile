FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install --registry=https://registry.npmmirror.com

RUN chmod +x /app/dev-startup.sh

EXPOSE 3000

ENTRYPOINT [ "sh", "/app/dev-startup.sh" ]