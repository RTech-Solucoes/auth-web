import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicRoute, LOGIN_ROUTE } from "@/lib/routes";

// Proxy do Next.js 16 — executado em TODA requisição antes de chegar na página
// Responsável por proteger rotas privadas redirecionando para o login
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Busca o token de acesso no cookie — salvo pelo session.setTokens()
  const token = request.cookies.get("accessToken")?.value;

  // Se a rota é pública, deixa passar sem verificar autenticação
  if (isPublicRoute(pathname)) {
    // Se já está autenticado e tenta acessar login, redireciona para dashboard
    if (token && pathname === LOGIN_ROUTE) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Rota privada — verifica se tem token
  if (!token) {
    // Não autenticado — redireciona para login
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Autenticado — deixa acessar a rota
  return NextResponse.next();
}

// Define em quais rotas o proxy vai rodar
// Exclui arquivos estáticos e internos do Next.js
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};