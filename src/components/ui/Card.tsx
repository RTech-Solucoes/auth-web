import { cn } from "@/lib/utils";

// Props do Card — container de conteúdo reutilizável
interface CardProps {
  children: React.ReactNode;
  className?: string; // classes extras do Tailwind
  padding?: "sm" | "md" | "lg"; // tamanho do padding interno (padrão: md)
}

// Card — container padrão com fundo e borda no tema RTech
// Usado para agrupar conteúdo em seções visuais distintas
export function Card({ children, className, padding = "md" }: CardProps) {
  const paddings = {
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  return (
    <div
      className={cn(paddings[padding], className)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
      }}
    >
      {children}
    </div>
  );
}
