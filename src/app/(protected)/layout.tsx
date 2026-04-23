import { Header } from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

// Layout autenticado — envolve todas as páginas da área protegida
// Inclui sidebar de navegação e header com dados do usuário
// Só é renderizado para usuários autenticados (garantido pelo proxy.ts)
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden" }}>
      {/* Sidebar — navegação lateral fixa */}
      <aside style={{ width: 256, flexShrink: 0, height: "100%" }}>
        <Sidebar />
      </aside>

      {/* Área principal — header + conteúdo */}
      <div style={{ display: "flex", flex: 1, flexDirection: "column", overflow: "hidden" }}>
        {/* Header — logo, usuário e logout */}
        <div style={{ height: 64, flexShrink: 0 }}>
          <Header />
        </div>

        {/* Conteúdo da página — scroll apenas aqui */}
        <main style={{
          flex: 1,
          overflowY: "auto",
          padding: 24,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}>
          {/* Breadcrumbs — navegação secundária */}
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}