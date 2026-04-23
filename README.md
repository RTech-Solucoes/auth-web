# Auth RTech

Plataforma de autenticação RTech.

## Requisitos

- Node.js >= 20.x
- npm >= 10.x

## Instalação

\`\`\`bash
git clone <repo>
cd auth-rtech
npm install
cp .env.example .env.local
# Preencher variáveis em .env.local
\`\`\`

## Scripts

| Comando              | Descrição                    |
|----------------------|------------------------------|
| npm run dev          | Servidor de desenvolvimento  |
| npm run build        | Build de produção            |
| npm run start        | Inicia build de produção     |
| npm run lint         | Verificar ESLint             |
| npm run lint:fix     | Corrigir erros de lint       |
| npm run format       | Formatar com Prettier        |
| npm run format:check | Verificar formatação         |

## Estrutura de Pastas

\`\`\`
src/
├── app/              # Rotas e páginas
├── components/
│   ├── ui/           # Componentes base
│   └── shared/       # Componentes compostos
├── hooks/            # Custom hooks
├── lib/              # Utilitários e helpers
├── services/         # Chamadas de API
├── types/            # Types e interfaces
└── styles/           # CSS global
\`\`\`

## Variáveis de Ambiente

Ver `.env.example` para lista completa.

## Convenções

- Componentes: PascalCase (`Button.tsx`)
- Hooks: camelCase com prefixo use (`useAuth.ts`)
- Types: PascalCase com sufixo Type/Props (`UserProps`)
- Variáveis de ambiente: ver `.env.example`