"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/contexts/TenantContext";

// Hook para páginas que obrigatoriamente precisam de tenant
// Se não tiver tenant ativo, redireciona para o login
// Uso: const { tenant } = useTenantRequired()
export function useTenantRequired() {
  const { tenant, isLoading } = useTenant();
  const router = useRouter();

  useEffect(() => {
    // Só verifica depois que terminou de carregar
    // Evita redirecionamento prematuro durante o bootstrap
    if (!isLoading && !tenant) {
      router.push("/login");
    }
  }, [tenant, isLoading, router]);

  return { tenant, isLoading };
}
