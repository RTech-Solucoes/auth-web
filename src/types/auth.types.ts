// Tipos relacionados à autenticação

// Dados enviados para fazer login
export interface LoginRequest {
  email: string;
  password: string;
}

// Dados enviados para criar uma conta
export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string; // opcional
  lastName?: string; // opcional
}

// Resposta do backend após login ou refresh bem-sucedido
export interface AuthResponse {
  accessToken: string; // token para autenticar requisições
  refreshToken: string; // token para renovar o accessToken quando expirar
  expiresIn: number; // tempo em segundos até o accessToken expirar
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

// Dados enviados para renovar o token
export interface RefreshRequest {
  refreshToken: string;
}

// Resposta da introspecção de token — usada por outros microserviços
// para validar se um token é válido sem acessar o banco diretamente
export interface IntrospectResponse {
  active: boolean; // token ainda é válido?
  userId?: string; // ID do usuário dono do token
  tenantId?: string; // tenant do usuário
  permissions?: string[]; // permissões do usuário
}

// Resposta do endpoint GET /auth/me
// Retorna os dados do usuário atualmente logado
export interface MeResponse {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    tenantId: string | null; // null = super usuário sem tenant
  };
}
