import { api } from "./api";

// Representa um usuário retornado pelo backend
// Versão simplificada — o tipo completo está em @/types/user.types.ts
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  tenantId: string | null; // null = super usuário sem tenant
  status: string; // active, inactive ou suspended
}

export const userService = {
  // Busca os dados do usuário atualmente logado
  // Usado no bootstrap da sessão (AuthContext) para carregar o usuário ao abrir o app
  getMe: () => api.get<{ user: User }>("/auth/me"),

  // Lista todos os usuários — requer permissão de admin
  getAll: () => api.get<User[]>("/users"),

  // Busca um usuário específico pelo ID
  getById: (id: string) => api.get<User>(`/users/${id}`),

  // Atualiza parcialmente um usuário
  // Partial = todos os campos são opcionais — pode enviar só o que mudou
  // Pick = só aceita firstName e lastName, ignora outros campos
  update: (id: string, data: Partial<Pick<User, "firstName" | "lastName">>) =>
    api.put<User>(`/users/${id}`, data),

  // Remove um usuário pelo ID — requer permissão de admin
  delete: (id: string) => api.delete<void>(`/users/${id}`),
};
