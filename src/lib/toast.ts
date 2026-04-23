import { toast } from "sonner";

// Helper centralizado para toasts padronizados no tema RTech
// Uso: notify.success("Usuário criado!")
//      notify.error("Erro ao salvar")
export const notify = {
  // Toast de sucesso — ação realizada com sucesso
  success: (message: string, description?: string) =>
    toast.success(message, { description }),

  // Toast de erro — algo deu errado
  error: (message: string, description?: string) =>
    toast.error(message, { description }),

  // Toast de aviso — atenção necessária
  warning: (message: string, description?: string) =>
    toast.warning(message, { description }),

  // Toast informativo — informação neutra
  info: (message: string, description?: string) =>
    toast.info(message, { description }),

  // Toast de loading — operação em andamento
  loading: (message: string) =>
    toast.loading(message),

  // Remove um toast pelo id
  dismiss: (id?: string | number) =>
    toast.dismiss(id),
};