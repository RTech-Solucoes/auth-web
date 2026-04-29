import { api } from "./api";
import type { Profile, UpdateProfileRequest } from "@/types/profile.types";

// Service do módulo de Perfil — exemplo de implementação padrão
// Serve como referência para criação de novos módulos
export const profileService = {
  // Busca o perfil do usuário logado
  getProfile: () => api.get<{ user: Profile }>("/auth/me"),

  // Atualiza o perfil do usuário logado
  updateProfile: (id: string, data: UpdateProfileRequest) => api.put<Profile>(`/users/${id}`, data),
};
