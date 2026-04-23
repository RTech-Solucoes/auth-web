"use client"; // obrigatório — error boundaries precisam ser Client Components no Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Página de erro global — captura erros não tratados em qualquer rota
// Props injetadas automaticamente pelo Next.js:
//   error — o erro que foi lançado (com digest para rastreamento em produção)
//   reset — função para tentar renderizar novamente sem recarregar a página
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // digest = ID único do erro gerado pelo Next.js em produção
  reset: () => void;
}) {
  // Loga o erro no console — em produção seria enviado para um serviço de monitoramento
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div style={{ display: "flex", height: "100svh", width: "100%", alignItems: "center", justifyContent: "center", background: "#020610" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, maxWidth: 400, textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 48, fontWeight: 700, color: "#f87171" }}>Ops!</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#ffffff" }}>Algo deu errado</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            Ocorreu um erro inesperado. Tente novamente ou volte para o login.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {/* reset() tenta re-renderizar o componente sem recarregar a página */}
          <button onClick={reset} style={{ background: "radial-gradient(ellipse 150% 200% at 44% 100%, #3d91ff 0%, #276cc8 20%, #104791 40%, #0c336a 70%, #082044 100%)", border: "1px solid #002159", borderRadius: 9999, padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#ffffff" }}>
            Tentar novamente
          </button>
          {/* Fallback — volta para o login se não conseguir recuperar */}
          <button onClick={() => router.push("/login")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
            Voltar ao login
          </button>
        </div>
      </div>
    </div>
  );
}