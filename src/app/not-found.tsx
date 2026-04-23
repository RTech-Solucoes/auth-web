"use client";

import { useRouter } from "next/navigation";
import { session } from "@/lib/session";

export default function NotFound() {
  const router = useRouter();

  // Se autenticado vai para o dashboard, senão vai para o login
  const destination = session.isAuthenticated() ? "/dashboard" : "/login";
  const label = session.isAuthenticated() ? "Voltar ao dashboard" : "Voltar ao login";

  return (
    <div style={{ display: "flex", height: "100svh", width: "100%", alignItems: "center", justifyContent: "center", background: "#020610" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, maxWidth: 400, textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 80, fontWeight: 700, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}>404</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#ffffff" }}>Página não encontrada</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>A página que você está procurando não existe ou foi movida.</div>
        </div>
        <button onClick={() => router.push(destination)} style={{ background: "radial-gradient(ellipse 150% 200% at 44% 100%, #3d91ff 0%, #276cc8 20%, #104791 40%, #0c336a 70%, #082044 100%)", border: "1px solid #002159", borderRadius: 9999, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#ffffff" }}>
          {label}
        </button>
      </div>
    </div>
  );
}