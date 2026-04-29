import type { Permission, Role, ROLE_PERMISSIONS } from "@/types/auth.roles";
import { ROLE_PERMISSIONS as ROLE_PERMS } from "@/types/auth.roles";

// Verifica se um role tem uma permissão específica
// Considera tanto as permissões do role quanto permissões customizadas
export function hasPermission(
  role: Role | null | undefined,
  permission: Permission,
  customPermissions: Permission[] = [],
): boolean {
  if (!role) return false;

  // Permissões do role padrão
  const rolePermissions = ROLE_PERMS[role] ?? [];

  // Verifica se tem a permissão no role ou nas permissões customizadas
  return rolePermissions.includes(permission) || customPermissions.includes(permission);
}

// Verifica se tem TODAS as permissões da lista
export function hasAllPermissions(
  role: Role | null | undefined,
  permissions: Permission[],
  customPermissions: Permission[] = [],
): boolean {
  return permissions.every((p) => hasPermission(role, p, customPermissions));
}

// Verifica se tem PELO MENOS UMA permissão da lista
export function hasAnyPermission(
  role: Role | null | undefined,
  permissions: Permission[],
  customPermissions: Permission[] = [],
): boolean {
  return permissions.some((p) => hasPermission(role, p, customPermissions));
}

// Verifica se o role é super_admin — acesso total
export function isSuperAdmin(role: Role | null | undefined): boolean {
  return role === "super_admin";
}
