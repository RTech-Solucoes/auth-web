"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";
import { session } from "@/lib/session";
import { logger } from "@/lib/logger";
import type { User } from "@/types/user.types";

// Define o que o contexto vai disponibilizar para toda a aplicação
interface AuthContextData {
  user: User | null;          // dados do usuário logado (null = não logado)
  isLoading: boolean;         // true enquanto verifica a sessão no bootstrap
  isAuthenticated: boolean;   // true se há usuário logado
  setUser: (user: User | null) => void; // atualiza o usuário manualmente
  logout: () => void;         // faz logout completo
}

// Cria o contexto com valor padrão vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // começa true — está verificando sessão

  // useCallback garante que a função logout não muda de referência
  // evita re-renders desnecessários em componentes que dependem dela
  const logout = useCallback(async () => {
    try {
      // Revoga o token no backend — mesmo que falhe, faz logout local
      await authService.logout();
    } catch {
      // Ignora erro — pode acontecer se o token já estiver inválido
    } finally {
      // Limpa sessão local, reseta o usuário e redireciona para login
      session.clear();
      setUser(null);
      window.location.href = "/login";
    }
  }, []);

  // Bootstrap de sessão — roda uma vez ao abrir o app
  // Verifica se há token salvo e busca os dados do usuário no backend
  useEffect(() => {
    async function loadUser() {
      // Se não tem token, não precisa buscar — usuário não está logado
      if (!session.isAuthenticated()) {
        setIsLoading(false);
        return;
      }
      try {
        // Busca os dados do usuário logado usando o token salvo
        const response = await userService.getMe();
        setUser(response.user as User);
        // Log de sessão restaurada com sucesso
        logger.info("Sessão restaurada", { email: response.user.email });
      } catch {
        // Token inválido ou expirado — limpa a sessão
        session.clear();
        logger.warn("Sessão inválida — tokens limpos");
      } finally {
        // Independente do resultado, terminou de carregar
        setIsLoading(false);
      }
    }

    loadUser();
  }, []); // [] = executa só uma vez, ao montar o componente

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user, // converte user para boolean
      setUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de auth em qualquer componente
// Lança erro se usado fora do AuthProvider
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
}