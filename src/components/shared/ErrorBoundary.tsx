"use client";

import React from "react";
import { logger } from "@/lib/logger";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  // Fallback customizado — o que mostrar quando der erro
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// ErrorBoundary — captura erros em componentes filhos evitando que a UI quebre toda
// Usa classe porque React error boundaries só funcionam com class components
// Uso: <ErrorBoundary><ComponenteQuePoDeQuebrar /></ErrorBoundary>
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Atualiza o estado quando um erro é capturado
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Loga o erro via logger centralizado — futuramente enviará para Sentry, Datadog, etc.
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logger.error("ErrorBoundary capturou um erro", { error: error.message, info });
  }

  render() {
    if (this.state.hasError) {
      // Se tem fallback customizado usa ele
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão — mensagem de erro inline sem quebrar o layout
      return (
        <div style={{
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.2)",
          borderRadius: 8,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#f87171" }}>
            Algo deu errado nesta seção
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            {this.state.error?.message ?? "Erro inesperado"}
          </div>
          {/* Botão para tentar renderizar novamente */}
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              alignSelf: "flex-start",
              background: "transparent",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: 6,
              padding: "4px 12px",
              cursor: "pointer",
              fontSize: 12,
              color: "#f87171",
              marginTop: 4,
            }}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}