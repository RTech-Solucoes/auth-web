# Guideline para Criação de Novos Módulos

## Visão Geral

Este documento define o padrão para criação de novas features no Auth RTech.
Siga este guia para manter consistência e escalabilidade no projeto.

## Estrutura padrão de um módulo

Exemplo: criando o módulo **Relatórios**

```
src/
├── app/(protected)/reports/     # Rotas do módulo
│   ├── page.tsx                 # Página principal (listagem)
│   └── [id]/page.tsx            # Página de detalhe
├── services/report.service.ts   # Comunicação com a API
└── types/report.types.ts        # Contratos TypeScript
```

## Passo a passo

### 1. Criar os tipos

```typescript
// src/types/report.types.ts
export interface Report {
  id: string;
  title: string;
  createdAt: string;
}
```

### 2. Criar o service

```typescript
// src/services/report.service.ts
import { api } from "./api";
import type { Report } from "@/types/report.types";

export const reportService = {
  getAll: () => api.get<Report[]>("/reports"),
  getById: (id: string) => api.get<Report>(`/reports/${id}`),
};
```

### 3. Criar as páginas

```tsx
// src/app/(protected)/reports/page.tsx
export default function ReportsPage() {
  return <div>Relatórios</div>;
}
```

### 4. Adicionar na sidebar

```tsx
// src/components/shared/Sidebar.tsx
{ href: "/reports", icon: <FileText size={16} />, label: "Relatórios", permission: "reports:read" },
```

### 5. Adicionar permissões

```typescript
// src/types/auth.roles.ts
type Permission =
  | "reports:read"
  | "reports:create"
  | "reports:update"
  | "reports:delete"

// Adicionar nas permissões dos roles
```

### 6. Criar testes

```typescript
// src/__tests__/report.test.ts
describe("reportService", () => {
  it("deve listar relatórios", () => { ... });
});
```

## Convenções obrigatórias

| Item | Padrão | Exemplo |
|------|--------|---------|
| Componentes | PascalCase | `ReportCard.tsx` |
| Hooks | camelCase + `use` | `useReports.ts` |
| Services | camelCase + `Service` | `reportService.ts` |
| Types | PascalCase | `Report`, `ReportProps` |
| Testes | mesmo nome + `.test` | `report.test.ts` |
| Commits | Conventional Commits | `feat(reports): adicionar listagem` |

## Checklist antes de abrir PR

- [ ] Types criados e exportados em `src/types/index.ts`
- [ ] Service criado e exportado em `src/services/index.ts`
- [ ] Permissões adicionadas em `auth.roles.ts`
- [ ] Item adicionado na sidebar com permissão correta
- [ ] Testes unitários criados
- [ ] `npm run test:run` passando
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros