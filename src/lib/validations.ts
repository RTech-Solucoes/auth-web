import { z } from "zod";

// Schema de validação do formulário de login
// Cada campo tem regras encadeadas — valida na ordem de cima para baixo
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")  // não pode ser vazio
    .email("Email inválido"),        // deve ter formato válido (ex: a@b.com)
  password: z
    .string()
    .min(1, "Senha é obrigatória")                      // não pode ser vazio
    .min(6, "Senha deve ter no mínimo 6 caracteres"),   // mínimo 6 caracteres
});

// Schema de validação do formulário de recuperação de senha
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
});

// Tipos inferidos automaticamente dos schemas
// z.infer extrai o tipo TypeScript do schema Zod — não precisa definir manualmente
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;