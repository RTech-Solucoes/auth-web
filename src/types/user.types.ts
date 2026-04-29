import type { Role, Permission } from "./auth.roles";

// Representa um usuário completo retornado pelo backend
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  tenantId: string | null;
  status: "active" | "inactive" | "suspended";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role?: Role; // role do usuário (opcional — nem sempre vem do backend)
  permissions?: Permission[]; // permissões customizadas além das do role
}

// Dados que podem ser atualizados em um usuário
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
}

// Dados necessários para criar um novo usuário
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  tenantId?: string;
}
