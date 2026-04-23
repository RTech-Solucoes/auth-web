// Logger centralizado para erros técnicos do frontend
// Em desenvolvimento: exibe no console
// Em produção: poderia enviar para Sentry, Datadog, etc.

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

// Formata e exibe o log no console com estilo
function formatLog(entry: LogEntry) {
  const styles: Record<LogLevel, string> = {
    info: "color: #60a5fa; font-weight: 500",
    warn: "color: #fbbf24; font-weight: 500",
    error: "color: #f87171; font-weight: 500",
    debug: "color: #a6c1ed; font-weight: 500",
  };

  const prefix = `[Auth RTech] [${entry.level.toUpperCase()}] ${entry.timestamp}`;

  if (entry.data) {
    console.groupCollapsed(`%c${prefix}: ${entry.message}`, styles[entry.level]);
    console.log("Data:", entry.data);
    console.groupEnd();
  } else {
    console.log(`%c${prefix}: ${entry.message}`, styles[entry.level]);
  }
}

// Cria uma entrada de log
function createEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
  return {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export const logger = {
  // Log informativo — eventos normais do sistema
  info: (message: string, data?: unknown) => {
    const entry = createEntry("info", message, data);
    if (process.env.NODE_ENV !== "production") formatLog(entry);
  },

  // Log de aviso — algo inesperado mas não crítico
  warn: (message: string, data?: unknown) => {
    const entry = createEntry("warn", message, data);
    formatLog(entry);
  },

  // Log de erro — algo deu errado
  error: (message: string, data?: unknown) => {
    const entry = createEntry("error", message, data);
    formatLog(entry);
    // TODO: em produção enviar para serviço de monitoramento (ex: Sentry)
    // if (process.env.NODE_ENV === "production") sendToSentry(entry);
  },

  // Log de debug — apenas em desenvolvimento
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      const entry = createEntry("debug", message, data);
      formatLog(entry);
    }
  },
};