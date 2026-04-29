"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/contexts/TenantContext";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";

export default function DashboardPage() {
  const { user } = useAuth();
  const { tenant } = useTenant();

  return (
    <div>
      <PageHeader
        title={`Olá, ${user?.firstName || user?.email?.split("@")[0] || "usuário"} 👋`}
        description="Bem-vindo ao Auth RTech — plataforma de autenticação centralizada."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Sessão
            </div>
            <Badge label="Autenticado" variant="success" />
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{user?.email}</div>
          </div>
        </Card>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Tenant
            </div>
            {tenant?.id ? (
              <>
                <Badge label="Ativo" variant="info" />
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                  {tenant.name ?? tenant.id}
                </div>
              </>
            ) : (
              <>
                <Badge label="Sem tenant" variant="neutral" />
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Super usuário</div>
              </>
            )}
          </div>
        </Card>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Sistema
            </div>
            <Badge label="Online" variant="success" />
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Auth RTech v1.0</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
