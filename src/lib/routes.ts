// Define quais rotas são públicas e quais são privadas
// Usado pelo middleware para proteger rotas autenticadas

// Rotas públicas — acessíveis sem autenticação
export const PUBLIC_ROUTES = ["/login", "/forgot-password", "/403", "/404"];

// Rota padrão após login bem-sucedido (quando não há ?origem=)
export const DEFAULT_REDIRECT = "/dashboard";

// Rota de login — para onde redirecionar quando não autenticado
export const LOGIN_ROUTE = "/login";

// Verifica se uma rota é pública
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

// Verifica se uma rota é privada (requer autenticação)
export function isPrivateRoute(pathname: string): boolean {
  return !isPublicRoute(pathname);
}
