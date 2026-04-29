// Página de loading global — exibida automaticamente pelo Next.js
// enquanto uma página ou layout está sendo carregado (Suspense)
// Também usada pelo Providers.tsx durante o bootstrap de sessão
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        height: "100svh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "#020610",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* Spinner animado com a cor accent do tema RTech */}
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid rgba(255,255,255,0.1)",
            borderTopColor: "#a6c1ed",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Carregando...</span>
      </div>
    </div>
  );
}
