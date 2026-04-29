"use client";

import { useState } from "react";

// Props do componente Field — input estilizado com o tema RTech
interface FieldProps {
  label: string; // texto do label acima do input
  placeholder: string; // texto placeholder dentro do input
  hint?: string; // texto clicável no canto direito do label (ex: "Esqueceu a senha?")
  type?: string; // tipo do input: "text", "email", "password" (padrão: "text")
  value?: string; // valor controlado pelo pai
  onChange?: (value: string) => void; // callback ao digitar — retorna o valor digitado
  onHintClick?: () => void; // callback ao clicar no hint
}

export const Field = ({
  label,
  placeholder,
  hint,
  type = "text",
  value,
  onChange,
  onHintClick,
}: FieldProps) => {
  // Controla o estado de foco para mudar a cor da borda
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Linha do label — label à esquerda, hint à direita */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>{label}</span>
        {/* Hint só aparece se a prop for passada */}
        {hint && (
          <span
            onClick={onHintClick}
            style={{
              fontSize: 11,
              color: "var(--accent-sub)",
              cursor: "pointer",
              textDecoration: "underline",
              transition: "color 0.2s ease",
            }}
            // Muda a cor ao passar o mouse — feedback visual de interatividade
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--accent-sub)")}
          >
            {hint}
          </span>
        )}
      </div>

      {/* Container do input — muda a borda quando focado */}
      <div
        style={{
          background: "var(--bg-input)",
          border: `1px solid ${isFocused ? "var(--accent)" : "var(--border-md)"}`,
          borderRadius: 9999, // pill shape
          padding: "14px 16px",
          transition: "border-color 0.2s ease",
        }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)} // ?. = só chama se onChange foi passado
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            fontSize: 14,
            color: "var(--t-white)",
            background: "transparent", // herda o background do container
            border: "none",
            outline: "none", // remove o outline padrão do browser
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};
