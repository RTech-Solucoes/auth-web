"use client";

import { useState, useCallback } from "react";
import { parseApiError } from "@/lib/errors";
import { isUnauthorized } from "@/lib/errors";
import { useAuth } from "@/contexts/AuthContext";

interface ErrorState {
  title: string;
  description: string;
}

// Hook centralizado para tratamento de erros de UI
// Uso: const { error, handleError, clearError } = useErrorHandler()
export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);
  const { logout } = useAuth();

  const handleError = useCallback((err: unknown) => {
    // Se for 401 fora do login — sessão expirada — faz logout
    if (isUnauthorized(err)) {
      logout();
      return;
    }

    // Converte o erro para mensagem amigável
    const parsed = parseApiError(err);
    setError(parsed);
  }, [logout]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}