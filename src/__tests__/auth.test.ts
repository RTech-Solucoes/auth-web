import { describe, it, expect } from "vitest";
import { parseApiError, isUnauthorized, isForbidden } from "@/lib/errors";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isSuperAdmin,
} from "@/lib/permissions";
import { loginSchema, forgotPasswordSchema } from "@/lib/validations";
import { ApiError } from "@/services/api";

// Testes dos utilitários de autenticação

describe("parseApiError", () => {
  it("deve retornar mensagem de credenciais inválidas para 401 no login", () => {
    const error = new ApiError(401, "Unauthorized");
    const result = parseApiError(error, "login");
    expect(result.title).toBe("Credenciais inválidas");
    expect(result.description).toBe("Email ou senha inválidos. Tente novamente.");
  });

  it("deve retornar mensagem de sessão expirada para 401 fora do login", () => {
    const error = new ApiError(401, "Unauthorized");
    const result = parseApiError(error);
    expect(result.title).toBe("Não autorizado");
  });

  it("deve retornar mensagem de sem permissão para 403", () => {
    const error = new ApiError(403, "Forbidden");
    const result = parseApiError(error);
    expect(result.title).toBe("Sem permissão");
  });

  it("deve retornar mensagem de sem conexão para TypeError", () => {
    const error = new TypeError("Failed to fetch");
    const result = parseApiError(error);
    expect(result.title).toBe("Sem conexão");
  });

  it("deve retornar mensagem genérica para erro desconhecido", () => {
    const result = parseApiError("erro qualquer");
    expect(result.title).toBe("Erro inesperado");
  });
});

describe("isUnauthorized / isForbidden", () => {
  it("deve identificar erro 401", () => {
    expect(isUnauthorized(new ApiError(401, "Unauthorized"))).toBe(true);
    expect(isUnauthorized(new ApiError(403, "Forbidden"))).toBe(false);
  });

  it("deve identificar erro 403", () => {
    expect(isForbidden(new ApiError(403, "Forbidden"))).toBe(true);
    expect(isForbidden(new ApiError(401, "Unauthorized"))).toBe(false);
  });
});

describe("hasPermission", () => {
  it("super_admin deve ter todas as permissões", () => {
    expect(hasPermission("super_admin", "users:delete")).toBe(true);
    expect(hasPermission("super_admin", "tenants:delete")).toBe(true);
  });

  it("user não deve ter permissão de deletar usuários", () => {
    expect(hasPermission("user", "users:delete")).toBe(false);
  });

  it("admin deve ter permissão de criar usuários", () => {
    expect(hasPermission("admin", "users:create")).toBe(true);
  });

  it("deve retornar false se role for null", () => {
    expect(hasPermission(null, "users:read")).toBe(false);
  });
});

describe("hasAnyPermission", () => {
  it("deve retornar true se tiver pelo menos uma permissão", () => {
    expect(hasAnyPermission("user", ["users:read", "users:delete"])).toBe(true);
  });

  it("deve retornar false se não tiver nenhuma permissão", () => {
    expect(hasAnyPermission("user", ["users:delete", "tenants:delete"])).toBe(false);
  });
});

describe("hasAllPermissions", () => {
  it("deve retornar true se tiver todas as permissões", () => {
    expect(hasAllPermissions("admin", ["users:read", "users:create"])).toBe(true);
  });

  it("deve retornar false se faltar alguma permissão", () => {
    expect(hasAllPermissions("user", ["users:read", "users:delete"])).toBe(false);
  });
});

describe("isSuperAdmin", () => {
  it("deve identificar super_admin", () => {
    expect(isSuperAdmin("super_admin")).toBe(true);
    expect(isSuperAdmin("admin")).toBe(false);
    expect(isSuperAdmin(null)).toBe(false);
  });
});

describe("loginSchema", () => {
  it("deve validar email e senha corretos", () => {
    const result = loginSchema.safeParse({ email: "test@test.com", password: "123456" });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar email inválido", () => {
    const result = loginSchema.safeParse({ email: "email-invalido", password: "123456" });
    expect(result.success).toBe(false);
  });

  it("deve rejeitar senha com menos de 6 caracteres", () => {
    const result = loginSchema.safeParse({ email: "test@test.com", password: "123" });
    expect(result.success).toBe(false);
  });
});

describe("forgotPasswordSchema", () => {
  it("deve validar email correto", () => {
    const result = forgotPasswordSchema.safeParse({ email: "test@test.com" });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar email inválido", () => {
    const result = forgotPasswordSchema.safeParse({ email: "invalido" });
    expect(result.success).toBe(false);
  });
});
