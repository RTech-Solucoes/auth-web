// Loading específico para rotas protegidas
// Exibido automaticamente pelo Next.js enquanto carrega páginas dentro de (protected)
// Diferente do loading.tsx global — este é específico para área autenticada
export default function ProtectedLoading() {
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
        {/* Spinner com cor accent do tema RTech */}
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
