"use client"; // formulário interativo — precisa ser Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RtechLogo } from "@/components/shared/RtechLogo";
import { ShieldCheck, KeyRound, Users, Settings, Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/auth.service";
import { parseApiError } from "@/lib/errors";
import { loginSchema } from "@/lib/validations";
import { session } from "@/lib/session";

// Posições fixas das estrelas do fundo — geradas deterministicamente para evitar flicker
// Math.random() causaria re-render diferente no servidor e no cliente (hydration mismatch)
const STARS = Array.from({ length: 40 }, (_, i) => ({
  w: i % 3 === 0 ? 2 : 1,
  top: `${((i * 2.47 + 7) % 100).toFixed(1)}%`,
  left: `${((i * 7.31 + 3) % 100).toFixed(1)}%`,
  opacity: 0.2 + (i % 5) * 0.08,
}));

// Features exibidas no rodapé do painel esquerdo
const FEATURES = [
  {
    icon: <ShieldCheck size={14} color="#a6c1ed" />,
    title: "Autenticação segura",
    desc: "Opaque tokens com introspection para múltiplos serviços SaaS multi-tenant.",
  },
  {
    icon: <KeyRound size={14} color="#a6c1ed" />,
    title: "Controle de acesso",
    desc: "RBAC + ABAC para controle granular de permissões por perfil e contexto.",
  },
  {
    icon: <Users size={14} color="#a6c1ed" />,
    title: "Multi-tenant",
    desc: "Isolamento completo de dados por tenant com auditoria de todas as ações.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // origem = URL do site que redirecionou para o auth (ex: ?origem=https://nfag.com.br)
  // Após login bem-sucedido, redireciona de volta para esse site
  const origem = searchParams.get("origem");

  // tenant = UUID do tenant enviado pelo sistema de origem (ex: ?tenant=uuid-do-tenant)
  // Capturado da URL e salvo na sessão para ser enviado automaticamente no header x-tenant-id
  const tenantParam = searchParams.get("tenant");
  if (tenantParam) {
    session.setTenantId(tenantParam);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async () => {
    setFieldErrors({});
    setError("");

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      session.setTokens(response.accessToken, response.refreshToken);

      // Usa window.location.href em vez de router.push
      // Força reload completo para o AuthProvider montar com o token já salvo
      window.location.href = origem ?? "/dashboard";
    } catch (err) {
      const { description } = parseApiError(err, "login");
      setError(description);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = loginSchema.safeParse({ email, password }).success;

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        background: "linear-gradient(139deg, #030610 21%, #001037 63%, #030610 103%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Estrelas de fundo — decorativas, não interativas */}
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: s.w,
            height: s.w,
            background: "white",
            borderRadius: "50%",
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Painel esquerdo — imagem + features — oculto em mobile (hidden lg:flex) */}
      <div
        className="hidden lg:flex"
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <img
            src="/images/login-circuit.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 25%",
              pointerEvents: "none",
            }}
          />
        </div>
        {/* Gradiente escuro sobre a imagem para melhorar contraste do rodapé */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 20%, rgba(2,6,16,0.6) 60%, rgba(2,6,16,0.95) 100%)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        {/* Rodapé com features do sistema */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(50px)",
            background: "rgba(2,6,23,0.42)",
            padding: "24px 32px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12, color: "#e4e4e0", marginBottom: 2 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel direito — formulário de login */}
      <div
        style={{
          width: "100%",
          maxWidth: "min(800px, 100%)",
          backdropFilter: "blur(50px)",
          background: "rgba(0,0,0,0.04)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(16px, 3vh, 40px) clamp(16px, 3vw, 32px)",
          position: "relative",
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px, 2vh, 24px)",
          }}
        >
          {/* Header — logo + botão de configurações */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <RtechLogo height={22} />
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9999,
                padding: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Settings size={18} color="rgba(255,255,255,0.4)" />
            </div>
          </div>

          {/* Título e subtítulo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: "clamp(22px, 4vw, 32px)", color: "#ffffff" }}>
              Entrar na plataforma
            </div>
            <div
              style={{
                fontSize: "clamp(13px, 1.5vw, 16px)",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.4,
              }}
            >
              Entre com suas credenciais para acessar o sistema
            </div>
          </div>

          {/* Erro geral — exibido quando o backend retorna erro */}
          {error && (
            <div
              style={{
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.3)",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 13,
                color: "#f87171",
              }}
            >
              {error}
            </div>
          )}

          {/* Campos do formulário */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 20px)" }}>
            {/* Campo de email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, color: "#a6c1ed" }}>Email</label>
              <div
                style={{
                  background: "#00071b",
                  border: `1px solid ${fieldErrors.email ? "#f87171" : "rgba(255,255,255,0.2)"}`,
                  borderRadius: 9999,
                  padding: "12px 16px",
                }}
              >
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((p) => ({ ...p, email: undefined }));
                  }}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 15,
                    color: "#ffffff",
                  }}
                />
              </div>
              {fieldErrors.email && (
                <span style={{ fontSize: 12, color: "#f87171", paddingLeft: 4 }}>
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Campo de senha */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
              >
                <label style={{ fontSize: 14, color: "#a6c1ed" }}>Senha</label>
                {/* Mantém o ?origem= ao navegar para forgot-password */}
                <span
                  style={{ fontSize: 12, color: "rgba(180,224,255,0.6)", cursor: "pointer" }}
                  onClick={() =>
                    router.push(`/forgot-password${origem ? `?origem=${origem}` : ""}`)
                  }
                >
                  Esqueceu a senha?
                </span>
              </div>
              <div
                style={{
                  background: "#00071b",
                  border: `1px solid ${fieldErrors.password ? "#f87171" : "rgba(255,255,255,0.2)"}`,
                  borderRadius: 9999,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((p) => ({ ...p, password: undefined }));
                  }}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 15,
                    color: "#ffffff",
                  }}
                />
                {/* Botão de mostrar/ocultar senha */}
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="rgba(255,255,255,0.4)" />
                  ) : (
                    <Eye size={18} color="rgba(255,255,255,0.4)" />
                  )}
                </div>
              </div>
              {fieldErrors.password && (
                <span style={{ fontSize: 12, color: "#f87171", paddingLeft: 4 }}>
                  {fieldErrors.password}
                </span>
              )}
            </div>

            {/* Checkbox "Lembrar de mim" */}
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#00071b",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 1,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {rememberMe && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path
                      d="M1 3L3 5L7 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", userSelect: "none" }}>
                Lembrar de mim
              </span>
            </div>
          </div>

          {/* Botão de login — desabilitado enquanto carrega */}
          <div
            onClick={!isLoading ? handleLogin : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              background:
                "radial-gradient(ellipse 150% 200% at 44% 100%, #3d91ff 0%, #276cc8 20%, #104791 40%, #0c336a 70%, #082044 100%)",
              border: "1px solid #002159",
              borderRadius: 9999,
              padding: "14px 16px",
              cursor: isLoading ? "not-allowed" : "pointer",
              textAlign: "center",
              transform: isHovered && !isLoading ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.2s ease",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? (
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#ffffff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <span style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>Entrando...</span>
              </div>
            ) : (
              <span style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>Entrar</span>
            )}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "underline",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Precisa de acesso? Fale com o administrador
          </span>
        </div>
      </div>
    </div>
  );
}
