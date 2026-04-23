# Estratégia Client vs Server Components

## Regra geral
Por padrão, todos os componentes são **Server Components**.
Adicionar `"use client"` apenas quando necessário.

## Quando usar Server Component
- Layouts (`layout.tsx`)
- Páginas estáticas
- Componentes que apenas exibem dados
- Acesso a variáveis de ambiente do servidor

## Quando usar Client Component
- Usa `useState`, `useEffect`, `useRouter`, `useSearchParams`
- Formulários interativos
- Eventos de clique/hover
- Acesso ao browser (localStorage, window, etc.)

## Convenções do projeto

| Caminho | Tipo | Motivo |
|---------|------|--------|
| `app/**/layout.tsx` | Server | Estrutura estática |
| `app/**/page.tsx` | Server por padrão | Vira Client se precisar |
| `app/(auth)/login/page.tsx` | Client | Formulário interativo |
| `app/(auth)/forgot-password/page.tsx` | Client | Formulário interativo |
| `components/ui/*` | Client | Componentes interativos |
| `components/shared/Providers.tsx` | Client | Contextos globais |
| `services/*` | Server | Chamadas de API |
| `lib/*` | Neutro | Utilitários puros |