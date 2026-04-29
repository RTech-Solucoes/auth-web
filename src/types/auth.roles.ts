// Modelo de roles e permissions no frontend
// Espelha o modelo do backend (RBAC + ABAC)

// Roles disponíveis no sistema
export type Role =
  | "super_admin" // acesso total ao sistema
  | "admin" // administrador do tenant
  | "manager" // gerente com acesso a relatórios e usuários
  | "user"; // usuário padrão com acesso básico

// Permissões granulares por recurso e ação
// Formato: "recurso:ação"
export type Permission =
  // Usuários
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:delete"
  // Tenants
  | "tenants:read"
  | "tenants:create"
  | "tenants:update"
  | "tenants:delete"
  // Roles
  | "roles:read"
  | "roles:create"
  | "roles:update"
  | "roles:delete"
  // Configurações
  | "settings:read"
  | "settings:update";

// Mapa de permissões padrão por role
// Define quais permissões cada role tem por padrão
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    "users:read",
    "users:create",
    "users:update",
    "users:delete",
    "tenants:read",
    "tenants:create",
    "tenants:update",
    "tenants:delete",
    "roles:read",
    "roles:create",
    "roles:update",
    "roles:delete",
    "settings:read",
    "settings:update",
  ],
  admin: [
    "users:read",
    "users:create",
    "users:update",
    "users:delete",
    "tenants:read",
    "roles:read",
    "settings:read",
    "settings:update",
  ],
  manager: [
    "users:read",
    "users:create",
    "users:update",
    "tenants:read",
    "roles:read",
    "settings:read",
  ],
  user: ["users:read", "settings:read"],
};

// Tipo que representa o usuário com suas permissões
export interface UserWithPermissions {
  id: string;
  email: string;
  role: Role;
  permissions: Permission[]; // permissões customizadas além das do role
}
