"use client"; // formulário interativo — precisa ser Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RtechLogo } from "@/components/shared/RtechLogo";
import { ArrowLeft, ShieldCheck, Lock, Headphones, Settings } from "lucide-react";

// Posições fixas das estrelas — geradas deterministicamente para evitar hydration mismatch
const STARS = Array.from({ length: 40 }, (_, i) => ({
  w: i % 3 === 0 ? 2 : 1,
  top: `${((i * 2.47 + 7) % 100).toFixed(1)}%`,
  left: `${((i * 7.31 + 3) % 100).toFixed(1)}%`,
  opacity: 0.2 + (i % 5) * 0.08,
}));

// Features exibidas no rodapé do painel esquerdo
const FEATURES = [
  { icon: <ShieldCheck size={14} color="#a6c1ed" />, title: "Recuperação segura", desc: "Processo de recuperação de senha com validação por email e token temporário." },
  { icon: <Lock size={14} color="#a6c1ed" />, title: "Acesso protegido", desc: "Link de recuperação expira em 30 minutos para garantir a segurança da conta." },
  { icon: <Headphones size={14} color="#a6c1ed" />, title: "Suporte disponível", desc: "Entre em contato com o administrador caso tenha dificuldades no acesso." },
];

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");

  // Controla qual estado exibir — formulário ou confirmação de envio
  const [emailSent, setEmailSent] = useState(false);

  // Validação simples de email — TODO: migrar para Zod como no login
  const isEmailValid = email.includes("@") && email.includes(".");

  // TODO: integrar com authService.forgotPassword() quando o backend tiver o endpoint
  // Por enquanto simula o envio com setTimeout
  const handleSendEmail = () => {
    if (!isEmailValid) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setEmailSent(true); }, 1500);
  };

  return (
    <div style={{ display: "flex", height: "100%", background: "linear-gradient(139deg, #030610 21%, #001037 63%, #030610 103%)", position: "relative", overflow: "hidden" }}>

      {/* Estrelas de fundo — decorativas, não interativas */}
      {STARS.map((s, i) => (
        <div key={i} style={{ position: "absolute", width: s.w, height: s.w, background: "white", borderRadius: "50%", top: s.top, left: s.left, opacity: s.opacity, pointerEvents: "none", zIndex: 0 }} />
      ))}

      {/* Painel esquerdo — imagem + features — oculto em mobile */}
      <div className="hidden lg:flex" style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "80%", overflow: "hidden", zIndex: 1 }}>
          <img src="/images/login-circuit.jpg" alt="" style={{ width: "100%", height: "130%", objectFit: "cover", objectPosition: "center 25%", marginTop: "-5%", pointerEvents: "none" }} />
        </div>
        {/* Gradiente escuro para melhorar contraste do rodapé */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(2,6,16,0.85) 80%, rgba(2,6,16,0.95) 100%)", pointerEvents: "none", zIndex: 3 }} />
        <div style={{ position: "relative", zIndex: 4, borderTop: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(50px)", background: "rgba(2,6,23,0.42)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 24px" }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
                <div style={{ width: 30, height: 30, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12, color: "#e4e4e0", marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel direito — formulário de recuperação de senha */}
      <div style={{ width: "100%", maxWidth: "min(800px, 100%)", backdropFilter: "blur(50px)", background: "rgba(0,0,0,0.04)", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(16px, 3vh, 40px) clamp(16px, 3vw, 32px)", position: "relative", zIndex: 1, overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 20px)" }}>

          {/* Header — logo + configurações */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <RtechLogo height={22} />
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Settings size={18} color="rgba(255,255,255,0.4)" />
            </div>
          </div>

          {/* Renderização condicional — formulário ou confirmação */}
          {!emailSent ? (
            <>
              {/* Estado inicial — formulário de recuperação */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Link para voltar ao login */}
                <span onClick={() => router.push("/login")} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <ArrowLeft size={14} /> Voltar para o login
                </span>
                <div style={{ fontWeight: 700, fontSize: "clamp(22px, 4vw, 32px)", color: "#ffffff" }}>Esqueceu a senha?</div>
                <div style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>Informe seu email cadastrado e enviaremos instruções para recuperação.</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.5vh, 16px)" }}>
                {/* Campo de email */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 14, color: "#a6c1ed" }}>Email cadastrado</label>
                  <div style={{ background: "#00071b", border: "1px solid rgba(255,255,255,0.6)", borderRadius: 8, padding: "12px 16px" }}>
                    <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: 15, color: "#ffffff" }} />
                  </div>
                </div>
                {/* Aviso sobre expiração do link */}
                <div style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(96,165,250,0.2)", border: "1px solid rgba(96,165,250,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: "#60a5fa" }}>i</div>
                  <div style={{ fontSize: 12, color: "rgba(96,165,250,0.9)", lineHeight: 1.5 }}>O link de recuperação expira em 30 minutos. Verifique sua caixa de entrada e spam.</div>
                </div>
              </div>

              {/* Botão de envio — desabilitado se email inválido */}
              <div onClick={!isLoading && isEmailValid ? handleSendEmail : undefined} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ background: "radial-gradient(ellipse 150% 200% at 44% 100%, #3d91ff 0%, #276cc8 20%, #104791 40%, #0c336a 70%, #082044 100%)", border: "1px solid #002159", borderRadius: 8, padding: "14px 16px", cursor: isLoading || !isEmailValid ? "not-allowed" : "pointer", textAlign: "center", transform: isHovered && !isLoading && isEmailValid ? "translateY(-2px)" : "translateY(0)", transition: "all 0.2s ease", opacity: isLoading || !isEmailValid ? 0.5 : 1 }}>
                {isLoading ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#ffffff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>Enviando...</span>
                  </div>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>Enviar link de recuperação</span>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Estado de sucesso — email enviado */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: "clamp(22px, 4vw, 32px)", color: "#ffffff" }}>Email enviado!</div>
                {/* Exibe o email para o qual foi enviado */}
                <div style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>Verifique sua caixa de entrada. Enviamos as instruções para <strong style={{ color: "#a6c1ed" }}>{email}</strong></div>
              </div>

              {/* Card com próximos passos */}
              <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✓</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#4ade80" }}>Próximos passos</div>
                </div>
                <div style={{ fontSize: 13, color: "rgba(74,222,128,0.9)", lineHeight: 1.6, paddingLeft: 40 }}>
                  <div style={{ marginBottom: 6 }}>1. Acesse sua caixa de entrada de email</div>
                  <div style={{ marginBottom: 6 }}>2. Clique no link de recuperação enviado</div>
                  <div>3. Defina uma nova senha segura</div>
                </div>
              </div>

              {/* Botão para voltar ao login */}
              <div onClick={() => router.push("/login")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "14px 16px", cursor: "pointer", textAlign: "center", transition: "all 0.2s ease" }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.8)" }}>Voltar para o login</span>
              </div>
            </>
          )}

          <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "underline", cursor: "pointer", textAlign: "center" }}>Precisa de acesso? Fale com o administrador</span>
        </div>
      </div>
    </div>
  );
}