// Variantes de status disponíveis
type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

// Props do Badge
interface BadgeProps {
  label: string;           // texto exibido
  variant?: BadgeVariant;  // estilo de cor (padrão: neutral)
}

// Mapa de estilos por variante — cores do tema RTech
const STYLES: Record<BadgeVariant, { background: string; color: string; border: string }> = {
  success: {
    background: "rgba(74,222,128,0.1)",
    color: "#4ade80",
    border: "1px solid rgba(74,222,128,0.25)",
  },
  warning: {
    background: "rgba(251,191,36,0.1)",
    color: "#fbbf24",
    border: "1px solid rgba(251,191,36,0.25)",
  },
  danger: {
    background: "rgba(248,113,113,0.1)",
    color: "#f87171",
    border: "1px solid rgba(248,113,113,0.25)",
  },
  info: {
    background: "rgba(96,165,250,0.1)",
    color: "#60a5fa",
    border: "1px solid rgba(96,165,250,0.25)",
  },
  neutral: {
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
};

// Badge — etiqueta de status reutilizável
// Uso: <Badge label="Ativo" variant="success" />
export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const style = STYLES[variant];

  return (
    <span style={{
      ...style,
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}