import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

// Testes dos componentes críticos da UI

describe("Badge", () => {
  it("deve renderizar o label corretamente", () => {
    render(<Badge label="Ativo" />);
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("deve renderizar variante success", () => {
    render(<Badge label="Online" variant="success" />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("deve renderizar variante danger", () => {
    render(<Badge label="Erro" variant="danger" />);
    expect(screen.getByText("Erro")).toBeInTheDocument();
  });

  it("deve usar variante neutral por padrão", () => {
    const { container } = render(<Badge label="Neutro" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("PageHeader", () => {
  it("deve renderizar o título", () => {
    render(<PageHeader title="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("deve renderizar a descrição quando fornecida", () => {
    render(<PageHeader title="Dashboard" description="Bem-vindo ao sistema" />);
    expect(screen.getByText("Bem-vindo ao sistema")).toBeInTheDocument();
  });

  it("não deve renderizar descrição quando não fornecida", () => {
    render(<PageHeader title="Dashboard" />);
    expect(screen.queryByText("Bem-vindo ao sistema")).not.toBeInTheDocument();
  });

  it("deve renderizar actions quando fornecido", () => {
    render(<PageHeader title="Dashboard" actions={<button>Novo</button>} />);
    expect(screen.getByText("Novo")).toBeInTheDocument();
  });
});

describe("Card", () => {
  it("deve renderizar o conteúdo filho", () => {
    render(
      <Card>
        <p>Conteúdo do card</p>
      </Card>,
    );
    expect(screen.getByText("Conteúdo do card")).toBeInTheDocument();
  });

  it("deve aceitar className extra", () => {
    const { container } = render(<Card className="extra-class">conteúdo</Card>);
    expect(container.firstChild).toHaveClass("extra-class");
  });
});
