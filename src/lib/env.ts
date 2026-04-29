import { z } from "zod";

// Schema de validação das variáveis de ambiente usando Zod
// Garante que o app não sobe sem as variáveis obrigatórias configuradas
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(), // URL do backend (deve ser uma URL válida)
  NEXT_PUBLIC_APP_NAME: z.string().min(1), // nome do app (não pode ser vazio)
  NODE_ENV: z.enum(["development", "production", "test"]), // ambiente atual
});

// Valida as variáveis ao importar o arquivo
// Se alguma estiver faltando ou inválida, o app lança erro antes de subir
export const env = envSchema.parse(process.env);
