import { ApiError } from "@/services/api";

// Formato padrão de mensagem de erro para exibir na UI
export type ErrorMessage = {
  title: string;       // título curto do erro
  description: string; // descrição detalhada para o usuário
};

// Converte qualquer erro em uma mensagem amigável para o usuário
// context = "login" diferencia erros 401 de credenciais inválidas vs sessão expirada
export function parseApiError(error: unknown, context?: "login"): ErrorMessage {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return {
          title: "Dados inválidos",
          description: error.message || "Verifique os dados informados.",
        };
      case 401:
        // No contexto de login, 401 significa credenciais erradas
        // Fora do login, 401 significa sessão expirada
        if (context === "login") {
          return {
            title: "Credenciais inválidas",
            description: "Email ou senha inválidos. Tente novamente.",
          };
        }
        return {
          title: "Não autorizado",
          description: "Sua sessão expirou. Faça login novamente.",
        };
      case 403:
        return {
          title: "Sem permissão",
          description: "Você não tem permissão para realizar essa ação.",
        };
      case 404:
        return {
          title: "Não encontrado",
          description: "O recurso solicitado não foi encontrado.",
        };
      case 409:
        // Conflito — geralmente email já cadastrado
        return {
          title: "Conflito",
          description: error.message || "Esse registro já existe.",
        };
      case 422:
        return {
          title: "Erro de validação",
          description: error.message || "Verifique os dados informados.",
        };
      case 429:
        // Too Many Requests — rate limiting do backend
        return {
          title: "Muitas tentativas",
          description: "Aguarde um momento antes de tentar novamente.",
        };
      case 500:
        return {
          title: "Erro interno",
          description: "Erro no servidor. Tente novamente mais tarde.",
        };
      default:
        return {
          title: "Erro",
          description: error.message || "Ocorreu um erro inesperado.",
        };
    }
  }

  // Erro de rede — backend inacessível ou sem internet
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return {
      title: "Sem conexão",
      description: "Verifique sua conexão com a internet.",
    };
  }

  // Qualquer outro erro inesperado
  return {
    title: "Erro inesperado",
    description: "Ocorreu um erro inesperado. Tente novamente.",
  };
}

// Helpers para verificar tipo de erro sem precisar importar ApiError
export function isUnauthorized(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

export function isForbidden(error: unknown): boolean {
  return error instanceof ApiError && error.status === 403;
}