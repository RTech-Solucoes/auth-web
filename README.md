# Auth RTech — Frontend

> Plataforma de autenticação centralizada para o ecossistema RTech. Auth provider multi-tenant com suporte a RBAC, opaque tokens e redirecionamento de origem.

## Tecnologias

- **Next.js 16** — App Router
- **TypeScript** — tipagem estática
- **Tailwind CSS 4** — estilização
- **Zod** — validação de schemas
- **Sonner** — sistema de notificações

## Funcionalidades

- ✅ Autenticação com opaque tokens
- ✅ Fluxo `?origem=` — redireciona para o site de origem após login
- ✅ Multi-tenant com header `x-tenant-id` automático
- ✅ Refresh automático de token
- ✅ Proteção de rotas via proxy
- ✅ Controle de acesso por roles e permissões (RBAC)
- ✅ Layout autenticado com sidebar e header
- ✅ Sistema de toast e logger centralizado

## Requisitos

- Node.js >= 20.x
- npm >= 10.x
- Backend [auth-api](https://github.com/RTech-Solucoes/auth-api) rodando

## Instalação

```bash
git clone https://github.com/RTech-Solucoes/auth-web.git
cd auth-web
npm install
cp .env.example .env.local
# Preencher variáveis em .env.local
npm run dev
```

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Auth RTech
NODE_ENV=development
```

## Scripts

| Comando                | Descrição                    |
|------------------------|------------------------------|
| `npm run dev`          | Servidor de desenvolvimento  |
| `npm run build`        | Build de produção            |
| `npm run start`        | Inicia build de produção     |
| `npm run lint`         | Verificar ESLint             |
| `npm run lint:fix`     | Corrigir erros de lint       |
| `npm run format`       | Formatar com Prettier        |
| `npm run format:check` | Verificar formatação         |

## Estrutura de Pastas

```
src/
├── app/
│   ├── (auth)/           # Rotas públicas — login, forgot-password
│   ├── (protected)/      # Rotas autenticadas — dashboard
│   └── 403/              # Página de acesso negado
├── components/
│   ├── ui/               # Componentes base — Button, Card, Badge
│   └── shared/           # Componentes compostos — Header, Sidebar, PermissionGuard
├── contexts/             # AuthContext, TenantContext
├── hooks/                # useAuth, useTenant, usePermission, useSessionExpired
├── lib/                  # errors, logger, permissions, routes, session, toast, validations
├── services/             # api client, authService, userService, tenantService
├── types/                # auth.types, user.types, auth.roles, api.types
└── proxy.ts              # Proteção de rotas (Next.js 16)
```

## Fluxo de Autenticação

```
Site externo → /login?origem=https://site.com&tenant=uuid
    → usuário faz login
    → tokens salvos (localStorage + cookie)
    → redireciona para ?origem ou /dashboard
```

## Convenções

- Componentes: PascalCase (`Button.tsx`)
- Hooks: camelCase com prefixo `use` (`useAuth.ts`)
- Services: camelCase com sufixo `Service` (`authService.ts`)
- Types: PascalCase com sufixo `Type/Props` (`UserProps`)
- Commits: Conventional Commits (`feat(scope): descrição`)