# Etapa de construção
FROM node:22.14.0 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do projeto
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Etapa de produção
FROM node:22.14.0 AS production

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários da etapa de construção
COPY --from=build /app /app

# Instalar as dependências de produção
RUN npm install --only=production

# Expor a porta que o Next.js vai rodar
EXPOSE 3000

# Definir o comando para iniciar a aplicação
CMD ["npm", "start"]
