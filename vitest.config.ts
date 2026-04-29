import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuração do Vitest — framework de testes unitários
export default defineConfig({
  plugins: [react()],
  test: {
    // Simula o ambiente do browser para testar componentes React
    environment: "jsdom",
    // Importa os matchers do jest-dom automaticamente em todos os testes
    setupFiles: ["./vitest.setup.ts"],
    // Permite usar describe/it/expect sem importar
    globals: true,
  },
  resolve: {
    alias: {
      // Mapeia @/ para src/ — igual ao tsconfig.json
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
