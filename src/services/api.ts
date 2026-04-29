import { session } from "@/lib/session";

// URL base do backend — vem do .env.local
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Classe de erro customizada para erros da API
// Estende o Error padrão do JS adicionando status HTTP e dados extras
export class ApiError extends Error {
  constructor(
    public status: number, // código HTTP (401, 404, 500, etc.)
    public message: string, // mensagem de erro
    public data?: unknown, // dados extras vindos do backend (opcional)
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Opções extras além do RequestInit padrão do fetch
interface RequestOptions extends RequestInit {
  token?: string; // token manual (sobrescreve o da sessão)
  tenantId?: string; // tenantId manual (sobrescreve o da sessão)
  skipAuth?: boolean; // true = não injeta o Authorization (ex: login, registro)
  _retry?: boolean; // controle interno — evita loop infinito no refresh
}

// Processa a resposta do fetch e lança ApiError se não for ok
async function handleResponse<T>(response: Response): Promise<T> {
  // 204 = No Content — retorna objeto vazio sem tentar parsear JSON
  if (response.status === 204) return {} as T;

  // Tenta parsear o JSON — se falhar retorna objeto vazio
  const data = await response.json().catch(() => ({}));

  // Se não foi ok (status >= 400), lança erro com os dados do backend
  if (!response.ok) {
    throw new ApiError(response.status, data.message || "Erro na requisição", data);
  }

  return data as T;
}

// Tenta renovar os tokens usando o refreshToken salvo na sessão
// Retorna true se conseguiu, false se falhou
async function refreshTokens(): Promise<boolean> {
  const refreshToken = session.getRefreshToken();
  if (!refreshToken) return false;

  try {
    // Chama o endpoint de refresh diretamente (sem usar o api client
    // para evitar loop infinito caso o refresh também retorne 401)
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    // Salva os novos tokens na sessão
    const data = await response.json();
    session.setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

// Função central que faz todas as requisições HTTP
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, tenantId, skipAuth, _retry, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Injeção automática do Authorization
  // skipAuth = true significa que a rota não precisa de token (ex: login)
  if (!skipAuth) {
    const storedToken = token || session.getAccessToken();
    if (storedToken) {
      headers["Authorization"] = `Bearer ${storedToken}`;
    }
  }

  // Injeção automática do x-tenant-id
  // Enviado em todas as requisições quando há tenant ativo
  const storedTenantId = tenantId || session.getTenantId();
  if (storedTenantId) {
    headers["x-tenant-id"] = storedTenantId;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  // Interceptor de 401 — token expirado
  // _retry evita loop infinito: tenta refresh apenas uma vez
  if (response.status === 401 && !_retry && !skipAuth) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      // Repete a requisição original com o novo token
      return request<T>(endpoint, { ...options, _retry: true });
    }
    // Se não conseguiu renovar, limpa sessão e redireciona para login
    session.clear();
    window.location.href = "/login";
    throw new ApiError(401, "Sessão expirada");
  }

  return handleResponse<T>(response);
}

// Métodos HTTP disponíveis para uso em toda a aplicação
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
