"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isSuperAdmin,
} from "@/lib/permissions";
import type { Permission, Role } from "@/types/auth.roles";

// Hook para verificar permissões do usuário logado
// Mais fácil que usar o PermissionGuard quando precisa verificar em lógica JS
// Uso: const { can } = usePermission()
//      if (can("users:delete")) { ... }
export function usePermission() {
  const { user } = useAuth();

  const role = user?.role as Role | undefined;
  const customPermissions = (user?.permissions as Permission[]) ?? [];

  return {
    // Verifica uma permissão específica
    can: (permission: Permission) => hasPermission(role, permission, customPermissions),

    // Verifica se tem pelo menos uma das permissões
    canAny: (permissions: Permission[]) => hasAnyPermission(role, permissions, customPermissions),

    // Verifica se tem todas as permissões
    canAll: (permissions: Permission[]) => hasAllPermissions(role, permissions, customPermissions),

    // Verifica se é super admin
    isSuperAdmin: () => isSuperAdmin(role),

    // Role atual do usuário
    role,
  };
}
