import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Props do Button — extende os atributos nativos do HTML button
// Permite passar qualquer atributo nativo (disabled, type, onClick, etc.)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"; // estilo visual (padrão: primary)
  size?: "sm" | "md" | "lg";                   // tamanho (padrão: md)
}

// Button com classes Tailwind — mais flexível que o Btn para uso com Tailwind
// Usa cn() para combinar classes condicionalmente sem conflitos
export function Button({
  variant = "primary",
  size = "md",
  className,   // classes extras passadas pelo pai
  children,    // conteúdo do botão (texto, ícone, etc.)
  ...props     // demais atributos HTML nativos (disabled, type, etc.)
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Classes base — aplicadas em todos os variants e sizes
        "rounded-md font-medium transition-colors cursor-pointer",
        {
          // Variantes de cor
          "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
          "border border-gray-300 hover:bg-gray-50": variant === "secondary",
          "hover:bg-gray-100": variant === "ghost",
        },
        {
          // Variantes de tamanho
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className // classes extras do pai sobrescrevem as padrão (twMerge resolve conflitos)
      )}
      {...props}
    >
      {children}
    </button>
  );
}