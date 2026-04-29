// Layout do grupo de rotas públicas de autenticação
// Envolve: /login e /forgot-password
// Não tem header, sidebar ou navegação — layout limpo para telas de auth
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // h-full — ocupa 100% da altura definida pelo body (que é h-full no layout raiz)
    // overflow-hidden — evita scroll nas telas de auth
    <div className="h-full w-full overflow-hidden">{children}</div>
  );
}
