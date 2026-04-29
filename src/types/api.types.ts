// Tipos genéricos para respostas da API

// Formato padrão de erro retornado pelo backend
export interface ApiErrorResponse {
  message: string; // mensagem de erro legível
  statusCode: number; // código HTTP (400, 401, 404, etc.)
  error?: string; // descrição técnica do erro (opcional)
}

// Formato para respostas paginadas — usado em listagens
// T é genérico: pode ser User[], Tenant[], etc.
export interface PaginatedResponse<T> {
  data: T[]; // lista de itens da página atual
  total: number; // total de registros no banco
  page: number; // página atual
  limit: number; // quantos itens por página
}

// Formato para respostas de sucesso com dados
export interface SuccessResponse<T> {
  data: T; // dados retornados
  message?: string; // mensagem opcional de sucesso
}
