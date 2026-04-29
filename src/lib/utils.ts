import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utilitário para combinar classes CSS do Tailwind de forma inteligente
// clsx — combina classes condicionalmente (ex: { "bg-red": isError })
// twMerge — resolve conflitos entre classes Tailwind (ex: "p-2 p-4" → "p-4")
// Uso: cn("base-class", isError && "text-red", className)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
