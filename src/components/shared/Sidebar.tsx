"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { RtechIcon } from "@/components/shared/RtechIcon";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { LayoutDashboard, Users, Settings, UserCircle } from "lucide-react";
import type { Permission } from "@/types/auth.roles";

// Itens de navegação com permissão necessária para ver
// permission: undefined = visível para todos os autenticados
const NAV_ITEMS: {
  href: string;
  icon: React.ReactNode;
  label: string;
  permission?: Permission;
}[] = [
  { href: "/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
  { href: "/users", icon: <Users size={16} />, label: "Usuários", permission: "users:read" },
  {
    href: "/settings",
    icon: <Settings size={16} />,
    label: "Configurações",
    permission: "settings:read",
  },
  { href: "/profile", icon: <UserCircle size={16} />, label: "Perfil" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "100%",
        height: "100%",
        background: "#00071b",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        padding: "16px 12px",
      }}
    >
      {/* Ícone RTech */}
      <div style={{ padding: "8px 12px", marginBottom: 16 }}>
        <RtechIcon size={28} />
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />

      {/* Itens de navegação — controlados por permissão */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_ITEMS.map(({ href, icon, label, permission }) => {
          const isActive = pathname === href;

          const linkElement = (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 6,
                textDecoration: "none",
                background: isActive ? "rgba(166,193,237,0.1)" : "transparent",
                border: isActive ? "1px solid rgba(166,193,237,0.15)" : "1px solid transparent",
                color: isActive ? "#a6c1ed" : "rgba(255,255,255,0.45)",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                }
              }}
            >
              {icon}
              {label}
            </Link>
          );

          // Se tem permissão definida, envolve com PermissionGuard
          if (permission) {
            return (
              <PermissionGuard key={href} permission={permission}>
                {linkElement}
              </PermissionGuard>
            );
          }

          return linkElement;
        })}
      </div>
    </aside>
  );
}
