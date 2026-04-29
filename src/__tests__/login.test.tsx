import { describe, it, expect, vi } from "vitest";
import { loginSchema } from "@/lib/validations";
import { parseApiError } from "@/lib/errors";
import { ApiError } from "@/services/api";

// Testes de integração do fluxo de login
// Testa a lógica do fluxo sem precisar de browser ou backend

describe("Fluxo de login — validação", () => {
  it("deve aceitar credenciais válidas", () => {
    const result = loginSchema.safeParse({
      email: "luiz.goulart@rtechsolution.com.br",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar email vazio", () => {
    const result = loginSchema.safeParse({ email: "", password: "123456" });
    expect(result.success).toBe(false);
    const errors = result.error?.flatten().fieldErrors;
    expect(errors?.email).toBeDefined();
  });

  it("deve rejeitar senha vazia", () => {
    const result = loginSchema.safeParse({ email: "test@test.com", password: "" });
    expect(result.success).toBe(false);
    const errors = result.error?.flatten().fieldErrors;
    expect(errors?.password).toBeDefined();
  });

  it("deve rejeitar senha com menos de 6 caracteres", () => {
    const result = loginSchema.safeParse({ email: "test@test.com", password: "123" });
    expect(result.success).toBe(false);
    const errors = result.error?.flatten().fieldErrors;
    expect(errors?.password?.[0]).toBe("Senha deve ter no mínimo 6 caracteres");
  });

  it("deve rejeitar email sem @", () => {
    const result = loginSchema.safeParse({ email: "emailinvalido", password: "123456" });
    expect(result.success).toBe(false);
    const errors = result.error?.flatten().fieldErrors;
    expect(errors?.email?.[0]).toBe("Email inválido");
  });
});

describe("Fluxo de login — tratamento de erros", () => {
  it("deve tratar erro 401 como credenciais inválidas", () => {
    const error = new ApiError(401, "Unauthorized");
    const result = parseApiError(error, "login");
    expect(result.title).toBe("Credenciais inválidas");
    expect(result.description).toBe("Email ou senha inválidos. Tente novamente.");
  });

  it("deve tratar erro 429 como muitas tentativas", () => {
    const error = new ApiError(429, "Too Many Requests");
    const result = parseApiError(error, "login");
    expect(result.title).toBe("Muitas tentativas");
  });

  it("deve tratar erro de rede", () => {
    const error = new TypeError("Failed to fetch");
    const result = parseApiError(error, "login");
    expect(result.title).toBe("Sem conexão");
  });

  it("deve tratar erro 500 como erro interno", () => {
    const error = new ApiError(500, "Internal Server Error");
    const result = parseApiError(error, "login");
    expect(result.title).toBe("Erro interno");
  });
});

describe("Fluxo de login — redirecionamento", () => {
  it("deve identificar origem na URL", () => {
    // Simula a lógica de capturar ?origem= da URL
    const url = new URL("http://localhost:3001/login?origem=https://nfag.com.br");
    const origem = url.searchParams.get("origem");
    expect(origem).toBe("https://nfag.com.br");
  });

  it("deve retornar null quando não há origem", () => {
    const url = new URL("http://localhost:3001/login");
    const origem = url.searchParams.get("origem");
    expect(origem).toBeNull();
  });

  it("deve capturar tenant da URL", () => {
    const url = new URL("http://localhost:3001/login?tenant=uuid-123");
    const tenant = url.searchParams.get("tenant");
    expect(tenant).toBe("uuid-123");
  });
});
