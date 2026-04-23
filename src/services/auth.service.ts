import { api } from "./api";
import type { LoginRequest, AuthResponse, MeResponse } from "@/types";

export const authService = {
  // Autentica o usuário — skipAuth pois ainda não tem token
  // tenantId opcional — enviado no header x-tenant-id se informado
  login: (dto: LoginRequest, tenantId?: string) =>
    api.post<AuthResponse>("/auth/login", dto, {
      headers: tenantId ? { "x-tenant-id": tenantId } : {},
      skipAuth: true, // não precisa de token para fazer login
    }),

  // Revoga o token no backend — Authorization é injetado automaticamente
  logout: () => api.post<void>("/auth/logout", {}),

  // Renova o par de tokens usando o refreshToken
  // skipAuth pois o accessToken pode estar expirado
  refresh: (refreshToken: string) =>
    api.post<AuthResponse>("/auth/refresh", { refreshToken }, {
      skipAuth: true,
    }),

  // Busca os dados do usuário logado — Authorization injetado automaticamente
  me: () => api.get<MeResponse>("/auth/me"),

  // Envia email de recuperação de senha
  // skipAuth pois o usuário não está logado
  forgotPassword: (email: string) =>
    api.post<void>("/auth/forgot-password", { email }, {
      skipAuth: true,
    }),
};