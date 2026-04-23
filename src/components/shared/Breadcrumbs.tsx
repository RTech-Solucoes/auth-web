"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Mapa de rotas para labels legíveis
// Adicionar novas rotas aqui conforme o projeto crescer
const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Usuários",
  settings: "Configurações",
  profile: "Perfil",
};

// Breadcrumbs — navegação secundária que mostra onde o usuário está
// Ex: Dashboard > Usuários > João Silva
export function Breadcrumbs() {
  const pathname = usePathname();

  // Quebra o pathname em segmentos e filtra vazios
  // Ex: "/dashboard/users" → ["dashboard", "users"]
  const segments = pathname.split("/").filter(Boolean);

  // Se estiver na raiz ou só no dashboard, não exibe breadcrumbs
  if (segments.length <= 1) return null;

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 0",
      marginBottom: 16,
    }}>
      {segments.map((segment, index) => {
        // Monta o href acumulando os segmentos anteriores
        // Ex: index 1 → "/dashboard/users"
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = ROUTE_LABELS[segment] ?? segment;

        return (
          <div key={href} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Separador — não aparece no primeiro item */}
            {index > 0 && (
              <ChevronRight size={14} color="rgba(255,255,255,0.25)" />
            )}

            {/* Último item — não é clicável, texto mais claro */}
            {isLast ? (
              <span style={{ fontSize: 13, color: "#a6c1ed", fontWeight: 500 }}>
                {label}
              </span>
            ) : (
              /* Itens anteriores — clicáveis */
              <Link href={href} style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}