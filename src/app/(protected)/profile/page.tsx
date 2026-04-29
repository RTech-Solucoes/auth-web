"use client";

import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { User, Mail, Building } from "lucide-react";

// Página de Perfil — módulo exemplo seguindo arquitetura padrão
// Serve como referência para criação de novos módulos no projeto
export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="Meu Perfil" description="Informações da sua conta no Auth RTech." />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}
      >
        {/* Card de informações pessoais */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Informações Pessoais
            </div>

            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(166,193,237,0.15)",
                  border: "1px solid rgba(166,193,237,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={20} color="#a6c1ed" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#ffffff" }}>
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : (user?.firstName ?? user?.email?.split("@")[0])}
                </div>
                <Badge label="Ativo" variant="success" />
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Mail size={14} color="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{user?.email}</span>
            </div>

            {/* Tenant */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Building size={14} color="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                {user?.tenantId ?? "Super usuário — sem tenant"}
              </span>
            </div>
          </div>
        </Card>

        {/* Card de status da conta */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Status da Conta
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Sessão</span>
                <Badge label="Autenticado" variant="success" />
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Tenant</span>
                <Badge
                  label={user?.tenantId ? "Com tenant" : "Sem tenant"}
                  variant={user?.tenantId ? "info" : "neutral"}
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Permissões</span>
                <Badge label={user?.role ?? "Sem role"} variant="neutral" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
