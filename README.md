# Projeto Next.js + Prisma + MySQL

Este projeto é uma aplicação web construída com Next.js, Prisma e MySQL. Abaixo estão as instruções para rodar o projeto
em desenvolvimento local ou em ambiente de produção com Docker.

---

## 🚀 Requisitos

- [Node.js](https://nodejs.org/) `v22.1.0` ou compatível
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- `npm` ou `yarn`

---

## ⚙️ Configuração Inicial

1. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

2. Ajuste as variáveis conforme necessário, como DATABASE_URL.

## 🧪 Rodando em Desenvolvimento

1. Suba o banco de dados com Docker:

```bash
docker-compose up -d mysql
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Rode as migrações e seeders (se necessário):

```bash
npx prisma migrate dev
npm run seed
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse em: http://localhost:3000

## 📦 Rodando em Produção com Docker
1. Copie o .env.example para .env:

```bash
cp .env.example .env
Construa e suba os containers:
```

```bash
docker-compose up --build
```

O sistema será iniciado em modo produção na porta 3000 e estará disponível em: http://localhost:3000

Durante o processo:

- O banco MySQL será iniciado

- As migrações Prisma serão aplicadas automaticamente

- O seeder será executado

- O Next.js será buildado em produção e iniciado

## 🛠 Scripts Úteis
```bash
npm run dev         # inicia o ambiente de desenvolvimento
npm run build       # compila para produção
npm run start       # roda o servidor em produção local
npm run migrate     # roda as migrações
npm run seed        # popula o banco com dados iniciais
```

## 🗂 Estrutura de Diretórios
app/ — Páginas e componentes Next.js

prisma/ — Arquivos do Prisma ORM (schema, migrations, seed)

lib/ — Módulos auxiliares como autenticação e conexão com o banco

public/ — Arquivos públicos

.env — Variáveis de ambiente

Dockerfile, docker-compose.yml — Infraestrutura containerizada

