// Props do PageHeader — cabeçalho padrão de página
interface PageHeaderProps {
  title: string;        // título principal da página
  description?: string; // subtítulo opcional
  actions?: React.ReactNode; // botões ou ações no lado direito (opcional)
}

// PageHeader — cabeçalho padrão usado no topo de cada página
// Exibe título, descrição opcional e ações à direita
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 24,
      gap: 16,
    }}>
      {/* Título e descrição */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", margin: 0 }}>
          {title}
        </h1>
        {description && (
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}>
            {description}
          </p>
        )}
      </div>

      {/* Ações — botões no lado direito */}
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}