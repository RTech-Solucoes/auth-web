// Chaves do localStorage centralizadas aqui
// Evita typos espalhados pelo código — qualquer mudança de nome é feita só aqui
const KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  tenantId: "tenantId",
} as const;

// Verifica se está rodando no browser
// Next.js roda código no servidor também (SSR) — localStorage não existe no servidor
function isClient() {
  return typeof window !== "undefined";
}

// Salva um cookie acessível pelo middleware do Next.js
// SameSite=Lax — proteção contra CSRF mantendo compatibilidade
// path=/ — válido em todas as rotas
function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
}

// Remove um cookie definindo uma data de expiração no passado
function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const session = {
  // Lê o accessToken salvo — null se não existir ou se estiver no servidor
  getAccessToken: () => isClient() ? localStorage.getItem(KEYS.accessToken) : null,

  // Lê o refreshToken salvo
  getRefreshToken: () => isClient() ? localStorage.getItem(KEYS.refreshToken) : null,

  // Lê o tenantId salvo
  getTenantId: () => isClient() ? localStorage.getItem(KEYS.tenantId) : null,

  // Salva o par de tokens após login ou refresh bem-sucedido
  // Salva no localStorage para uso nas requisições HTTP
  // Salva também em cookie para o middleware do Next.js conseguir ler
  setTokens: (accessToken: string, refreshToken: string) => {
    if (!isClient()) return;
    localStorage.setItem(KEYS.accessToken, accessToken);
    localStorage.setItem(KEYS.refreshToken, refreshToken);
    setCookie(KEYS.accessToken, accessToken); // cookie para o middleware
  },

  // Salva o tenant ativo — chamado ao selecionar um tenant
  setTenantId: (tenantId: string) => {
    if (!isClient()) return;
    localStorage.setItem(KEYS.tenantId, tenantId);
  },

  // Limpa toda a sessão — chamado no logout ou quando o token expira
  // Remove do localStorage e também do cookie
  clear: () => {
    if (!isClient()) return;
    localStorage.removeItem(KEYS.accessToken);
    localStorage.removeItem(KEYS.refreshToken);
    localStorage.removeItem(KEYS.tenantId);
    deleteCookie(KEYS.accessToken); // remove o cookie também
  },

  // Verifica se o usuário está autenticado
  // Baseado na presença do accessToken — não valida se o token é válido
  isAuthenticated: () => {
    if (!isClient()) return false;
    return !!localStorage.getItem(KEYS.accessToken);
  },
};