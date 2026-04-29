# Arquitetura e Estratégia de Componentes

## Arquitetura Modular por Domínio

O projeto é organizado por **responsabilidade técnica**, preparado para crescer em módulos por domínio:

```
src/
├── app/                    # Rotas e páginas (Next.js App Router)
│   ├── (auth)/             # Domínio: autenticação pública
│   ├── (protected)/        # Domínio: área autenticada
│   └── 403/                # Páginas de erro
├── components/
│   ├── ui/                 # Componentes base reutilizáveis (Button, Card, Badge)
│   └── shared/             # Componentes compostos (Header, Sidebar, Guards)
├── contexts/               # Estado global (AuthContext, TenantContext)
├── hooks/                  # Lógica reutilizável (useAuth, usePermission)
├── lib/                    # Utilitários puros (errors, logger, permissions)
├── services/               # Comunicação com API (authService, userService)
└── types/                  # Contratos TypeScript (auth.types, user.types)
```

## Como adicionar um novo domínio

Exemplo: adicionar módulo de **Relatórios**

```
src/
├── app/(protected)/reports/    # Rotas do domínio
│   ├── page.tsx                # Listagem
│   └── [id]/page.tsx           # Detalhe
├── services/report.service.ts  # Comunicação com API
└── types/report.types.ts       # Contratos TypeScript
```

## Estratégia Client vs Server Components

### Regra geral

Por padrão, todos os componentes são **Server Components**.
Adicionar `"use client"` apenas quando necessário.

### Quando usar Server Component

- Layouts (`layout.tsx`)
- Páginas estáticas
- Componentes que apenas exibem dados
- Acesso a variáveis de ambiente do servidor

### Quando usar Client Component

- Usa `useState`, `useEffect`, `useRouter`, `useSearchParams`
- Formulários interativos
- Eventos de clique/hover
- Acesso ao browser (localStorage, window, etc.)

### Convenções do projeto

| Caminho                           | Tipo              | Motivo                  |
| --------------------------------- | ----------------- | ----------------------- |
| `app/**/layout.tsx`               | Server            | Estrutura estática      |
| `app/**/page.tsx`                 | Server por padrão | Vira Client se precisar |
| `app/(auth)/login/page.tsx`       | Client            | Formulário interativo   |
| `components/ui/*`                 | Client            | Componentes interativos |
| `components/shared/Providers.tsx` | Client            | Contextos globais       |
| `services/*`                      | Server            | Chamadas de API         |
| `lib/*`                           | Neutro            | Utilitários puros       |

## Convenções de nomenclatura

- Componentes: PascalCase (`Button.tsx`)
- Hooks: camelCase com prefixo `use` (`useAuth.ts`)
- Services: camelCase com sufixo `Service` (`authService.ts`)
- Types: PascalCase com sufixo `Type/Props` (`UserProps`)
- Testes: mesmo nome do arquivo + `.test` (`auth.test.ts`)
- Commits: Conventional Commits (`feat(scope): descrição`)
