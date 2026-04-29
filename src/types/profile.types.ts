// Tipos do módulo de Perfil — exemplo de implementação padrão
// Serve como referência para criação de novos módulos

// Dados do perfil do usuário
export interface Profile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  tenantId: string | null;
  createdAt: string;
  updatedAt: string;
}

// Dados para atualizar o perfil
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}