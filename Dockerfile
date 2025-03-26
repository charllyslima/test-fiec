FROM node:22.1.0-alpine

WORKDIR /app

# Copia e instala dependências
COPY package.json package-lock.json ./
RUN npm ci

# Copia todo o código
COPY . .

# Prisma generate em tempo de build
RUN npx prisma generate

# Builda o Next.js
RUN npm run build

EXPOSE 3000

# Produção (migrations e seed rodam no entrypoint)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm start"]
