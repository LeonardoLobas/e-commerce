# E-commerce — Next.js + Fake Store API

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)

Aplicação de e-commerce completa construída com **Next.js App Router**, consumindo a [Fake Store API](https://fakestoreapi.com) como back-end. O projeto cobre autenticação com JWT, gerenciamento de produtos, carrinho de compras e usuários — tudo com uma interface moderna e responsiva.

---

## Funcionalidades

- **Autenticação** — Login e cadastro com token JWT armazenado em cookie `httpOnly`. Middleware de rota protege páginas privadas e redireciona automaticamente.
- **Produtos** — Listagem completa do catálogo com modal de detalhe, criação e remoção de produtos.
- **Carrinho** — Adição de itens, atualização de quantidade em tempo real, remoção de produtos e cálculo de total.
- **Usuários** — Listagem de todos os usuários cadastrados na API.
- **Feedback visual** — Toasts de sucesso/erro (Sonner) em todas as ações assíncronas.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 + shadcn/ui |
| Estado / Cache | TanStack Query (React Query v5) |
| Formulários | React Hook Form + Zod |
| Animações | Framer Motion |
| Toasts | Sonner |
| API | Fake Store API |

---

## Sobre a Fake Store API

A [Fake Store API](https://fakestoreapi.com) é uma REST API pública e gratuita que simula um back-end de e-commerce real. Ela fornece endpoints para:

| Recurso | Endpoint |
|---|---|
| Produtos | `GET/POST/PUT/DELETE /products` |
| Carrinho | `GET/POST/PUT/DELETE /carts` |
| Usuários | `GET/POST/PUT/DELETE /users` |
| Login (JWT) | `POST /auth/login` |

> **Importante:** a API é uma simulação — operações de escrita (POST, PUT, DELETE) são aceitas e retornam resposta válida, mas **não persistem dados** no servidor. É ideal para demos e portfólio.

---

## Rotas da Aplicação

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Protegida | Home com hero, carrossel e estatísticas |
| `/login` | Pública | Formulário de autenticação |
| `/register` | Pública | Cadastro de novo usuário |
| `/products` | Protegida | Catálogo de produtos |
| `/cart` | Protegida | Carrinho de compras |
| `/users` | Protegida | Lista de usuários |

Rotas protegidas redirecionam para `/login` sem token válido. Usuários autenticados são redirecionados para `/` ao acessar `/login` ou `/register`.

---

## Usuário de Teste

Para acessar a aplicação sem criar uma conta:

| Campo | Valor |
|---|---|
| **Usuário** | `johnd` |
| **Senha** | `m38rmF$` |

> Precisa de outros usuários para testar? Faça um `GET` em `https://fakestoreapi.com/users` — o endpoint é público e retorna todos os usuários cadastrados. Use o campo `username` e a senha correspondente.

---

## Como rodar localmente

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/e-commerce.git
cd e-commerce
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:
```bash
BASE_URL=https://fakestoreapi.com
```

**4. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

**5. Build de produção (opcional)**
```bash
npm run build
npm start
```

---

## Estrutura do projeto

```
src/
├── app/              # Rotas (App Router)
├── components/ui/    # Componentes globais (Header, Footer, etc.)
├── core/auth/        # Autenticação (actions, services, hooks, context)
├── features/         # Módulos de domínio (products, carts, users)
├── lib/              # Utilitários
└── shared/           # Tipos e providers globais
```
