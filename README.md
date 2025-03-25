This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Organização de pastas
```
src/
│
├── components/            # Componentes reutilizáveis (segundo princípio SRP)
│   ├── Button.js
│   ├── Header.js
│   └── Footer.js
│
├── pages/                 # Páginas do Next.js
│   ├── index.js           # Página inicial
│   └── about.js           # Outra página de exemplo
│
├── services/              # Regras de negócios (segundo princípio OCP)
│   ├── ApiService.js      # Lógica para consumir APIs (pode ser estendido sem modificar)
│   └── UserService.js     # Lógica de manipulação de usuário
│
├── domain/                # Entidades e objetos do domínio (segundo princípio DIP)
│   ├── User.js            # Entidade que representa um usuário
│   └── Product.js         # Entidade que representa um produto
│
├── hooks/                 # Hooks personalizados
│   ├── useUser.js         # Hook para manipular o estado do usuário
│   └── useAuth.js         # Hook para autenticação
│
├── utils/                 # Funções utilitárias
│   ├── formatDate.js      # Função para formatar datas
│   └── validateEmail.js   # Função para validar e-mails
│
├── styles/                # Estilos globais e específicos
│   ├── globals.css
│   └── button.module.css
│
└── tests/                 # Testes (cada unidade tem seu próprio teste)
    ├── components/
    └── services/

```