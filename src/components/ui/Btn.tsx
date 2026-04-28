// Props do componente Btn — botão estilizado com o tema RTech
interface BtnProps {
  label: string;                                    // texto do botão
  onClick?: () => void;                             // ação ao clicar (opcional)
  variant?: "primary" | "outline" | "ghost";        // estilo visual (padrão: primary)
  full?: boolean;                                   // ocupa 100% da largura? (padrão: false)
  small?: boolean;                                  // tamanho reduzido? (padrão: false)
}

export const Btn = ({
  label,
  onClick,
  variant = "primary",
  full = false,
  small = false,
}: BtnProps) => {
  // Estilos de cada variante usando tokens CSS definidos no globals.css
  const styles = {
    // Primary — gradiente azul RTech (botão principal de ação)
    primary: {
      background: "linear-gradient(95deg, #002159 7%, #00286b 33%, #0050d4 67%, #002159 93%)",
      color: "#ffffff",
      border: "1px solid #002159",
    },
    // Outline — transparente com borda (ação secundária)
    outline: {
      background: "transparent",
      color: "var(--t-60)",
      border: "1px solid var(--border)",
    },
    // Ghost — sem borda, só texto colorido (ação terciária ou links)
    ghost: {
      background: "transparent",
      color: "var(--accent)",
      border: "none",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: small ? "8px 16px" : "16px 32px", // small = padding menor
        fontSize: small ? 12 : 14,
        fontWeight: 700,
        borderRadius: 9999,  // totalmente arredondado (pill shape)
        cursor: "pointer",
        width: full ? "100%" : "auto", // full = ocupa toda a largura do container
        lineHeight: 1,
        transition: "all 0.15s ease", // transição suave em hover/focus
      }}
    >
      {label}
    </button>
  );
};