"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { session } from "@/lib/session";

// Hook que monitora globalmente se a sessão expirou
// Usado no Providers.tsx para proteger toda a aplicação
export function useSessionExpired() {
  const { logout } = useAuth();

  useEffect(() => {
    // Disparado quando o localStorage muda em OUTRA aba do navegador
    // Ex: usuário tem o sistema aberto em duas abas e desloga em uma
    // → a outra aba detecta a mudança e faz logout automaticamente
    function handleStorageChange(event: StorageEvent) {
      if (event.key === "accessToken" && !event.newValue) {
        logout();
      }
    }

    // Disparado quando o usuário volta para a aba do sistema
    // Ex: estava no YouTube, voltou para o sistema
    // → verifica se ainda tem token, se não tiver faz logout
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        if (!session.isAuthenticated()) {
          logout();
        }
      }
    }

    // Registra os listeners de eventos
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup — remove os listeners quando o componente é desmontado
    // Evita memory leaks e listeners duplicados
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [logout]); // re-executa apenas se a função logout mudar
}
