import { redirect } from "next/navigation";

// Página raiz "/" — não tem conteúdo próprio
// Redireciona automaticamente para /login que é o ponto de entrada da aplicação
// O redirect() do Next.js funciona no servidor — sem flash de conteúdo
export default function Home() {
  redirect("/login");
}