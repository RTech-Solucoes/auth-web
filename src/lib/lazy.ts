import dynamic from "next/dynamic";

// Lazy loading — carrega componentes pesados só quando necessário
// Reduz o bundle inicial e melhora o tempo de carregamento
// Uso: import { LazyDashboardChart } from "@/lib/lazy"

// Exemplo de componente pesado carregado sob demanda
// Quando o projeto crescer, adicionar aqui componentes como:
// - Gráficos (recharts, chart.js)
// - Editores de texto (tiptap, quill)
// - Tabelas complexas (tanstack table)
// - Mapas (leaflet, mapbox)

// Exemplo de uso com loading placeholder:
// export const LazyChart = dynamic(() => import("@/components/Chart"), {
//   loading: () => <div>Carregando gráfico...</div>,
//   ssr: false, // desativa SSR para componentes que usam browser APIs
// });

// Helper para criar componentes lazy padronizados
export function createLazy<T extends React.ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    ssr?: boolean;
    loading?: () => React.ReactNode;
  }
) {
  return dynamic(importFn, {
    ssr: options?.ssr ?? true,
    loading: options?.loading,
  });
}