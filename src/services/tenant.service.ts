import { api } from "./api";

// Representa um tenant (empresa/organização) no sistema
export interface Tenant {
  id: string;
  name: string;   // nome da empresa
  slug: string;   // identificador único amigável (ex: "rtech-solutions")
  status: string; // situação do tenant (active, inactive, etc.)
}

export const tenantService = {
  // Lista todos os tenants disponíveis
  getAll: () => api.get<Tenant[]>("/tenants"),

  // Busca um tenant específico pelo ID
  getById: (id: string) => api.get<Tenant>(`/tenants/${id}`),

  // Cria um novo tenant
  // Pick<Tenant, "name" | "slug"> = só aceita name e slug, ignora o resto
  create: (data: Pick<Tenant, "name" | "slug">) =>
    api.post<Tenant>("/tenants", data),

  // Atualiza parcialmente um tenant
  // Partial = todos os campos são opcionais — pode enviar só o que mudou
  update: (id: string, data: Partial<Pick<Tenant, "name" | "slug">>) =>
    api.put<Tenant>(`/tenants/${id}`, data),
};