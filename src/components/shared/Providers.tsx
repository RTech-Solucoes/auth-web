"use client";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { useSessionExpired } from "@/hooks/useSessionExpired";
import { Toaster } from "sonner";

function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  // Monitora sessão expirada globalmente em toda a aplicação
  useSessionExpired();

  if (isLoading) {
    return (
      <div style={{ display: "flex", height: "100svh", width: "100%", alignItems: "center", justifyContent: "center", background: "#020610" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 32, border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#a6c1ed", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Carregando...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TenantProvider>
        <AppContent>{children}</AppContent>
        {/* Toast global — disponível em toda a aplicação */}
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          closeButton
        />
      </TenantProvider>
    </AuthProvider>
  );
}