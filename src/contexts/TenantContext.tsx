"use client";

import { createContext, useContext, useState } from "react";
import { session } from "@/lib/session";

// Representa um tenant (empresa/organização) ativo na sessão
interface Tenant {
  id: string;
  name?: string; // opcional — nem sempre temos o nome disponível
}

// Define o que o contexto vai disponibilizar para toda a aplicação
interface TenantContextData {
  tenant: Tenant | null; // tenant ativo (null = sem tenant)
  isLoading: boolean; // carregando dados do tenant
  setTenant: (tenant: Tenant | null) => void; // troca o tenant ativo
  clearTenant: () => void; // limpa o tenant ativo
}

const TenantContext = createContext<TenantContextData>({} as TenantContextData);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  // Inicializa lendo direto da sessão — evita useEffect desnecessário
  // Se já tinha tenantId salvo, restaura o tenant ao abrir o app
  const [tenant, setTenantState] = useState<Tenant | null>(() => {
    const tenantId = session.getTenantId();
    return tenantId ? { id: tenantId } : null;
  });

  // false por padrão — não precisa carregar nada assincronamente aqui
  const [isLoading, setIsLoading] = useState(false);

  // Troca o tenant ativo — salva na sessão e atualiza o estado
  // Ao fazer requisições, o api.ts injeta automaticamente o x-tenant-id
  function setTenant(tenant: Tenant | null) {
    if (tenant) {
      session.setTenantId(tenant.id); // persiste no localStorage
      setTenantState(tenant); // atualiza o estado React
    } else {
      clearTenant();
    }
  }

  // Limpa o tenant da sessão e do estado
  function clearTenant() {
    localStorage.removeItem("tenantId");
    setTenantState(null);
  }

  return (
    <TenantContext.Provider value={{ tenant, isLoading, setTenant, clearTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

// Hook para usar o tenant em qualquer componente
// Lança erro se usado fora do TenantProvider
export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) throw new Error("useTenant deve ser usado dentro do TenantProvider");
  return context;
}
