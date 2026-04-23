import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import "./globals.css"; // estilos globais + tokens CSS do tema RTech

// Configura a fonte Geist do Google Fonts
// variable = nome da CSS variable gerada (--font-geist-sans)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Metadados da aplicação — aparecem na aba do browser e em SEO
export const metadata: Metadata = {
  title: "Auth RTech",
  description: "Auth provider for RTech",
};

// Layout raiz — envolve TODAS as páginas da aplicação
// É o único lugar onde html e body são definidos
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${geistSans.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-[#020610] text-white">
        {/* Providers envolve toda a aplicação com AuthProvider e TenantProvider */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}