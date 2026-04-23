"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission, hasAnyPermission, isSuperAdmin } from "@/lib/permissions";
import type { Permission, Role } from "@/types/auth.roles";

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: Permission;
  anyOf?: Permission[];
  // redirect: true = redireciona para /403, false = esconde o componente (padrão)
  redirect?: boolean;
  fallback?: React.ReactNode;
}

// PermissionGuard — wrapper que controla visibilidade por permissão
// Se redirect=true, redireciona para /403 quando não tem permissão
// Se redirect=false, renderiza o fallback ou nada
export function PermissionGuard({
  children,
  permission,
  anyOf,
  redirect = false,
  fallback = null,
}: PermissionGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  // Verifica se tem permissão
  const role = user?.role as Role;
  const customPermissions = user?.permissions as Permission[] ?? [];

 let allowed = true;

// Se não tem role definido, permite tudo — backend ainda não retorna role
if (!role) {
  allowed = true;
} else if (isSuperAdmin(role)) {
  allowed = true;
} else if (permission) {
  allowed = hasPermission(role, permission, customPermissions);
} else if (anyOf && anyOf.length > 0) {
  allowed = hasAnyPermission(role, anyOf, customPermissions);
}

  // Se redirect=true e não tem permissão, redireciona para /403
  useEffect(() => {
    if (!allowed && redirect) {
      router.push("/403");
    }
  }, [allowed, redirect, router]);

  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
}