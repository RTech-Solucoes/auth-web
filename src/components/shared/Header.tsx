"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/contexts/TenantContext";
import { RtechLogo } from "@/components/shared/RtechLogo";
import { LogOut, User } from "lucide-react";

// Header da aplicação autenticada
// Exibe: logo, informações do usuário logado, tenant ativo e botão de logout
export function Header() {
  const { user, logout } = useAuth();
  const { tenant } = useTenant();

  return (
    <header
      style={{
        height: "100%",
        background: "#000d2e",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Logo */}
      <RtechLogo height={20} />

      {/* Lado direito — tenant + usuário + logout */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Tenant ativo */}
        {tenant?.id && (
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "4px 10px",
            }}
          >
            Tenant: {tenant.name ?? tenant.id.slice(0, 8)}...
          </div>
        )}

        {/* Informações do usuário */}
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: "rgba(166,193,237,0.15)",
                border: "1px solid rgba(166,193,237,0.3)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={14} color="#a6c1ed" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#ffffff" }}>
                {user.firstName ?? user.email.split("@")[0]}
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{user.email}</span>
            </div>
          </div>
        )}

        {/* Botão de logout */}
        <button
          onClick={() => logout()}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f87171";
            e.currentTarget.style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </header>
  );
}
