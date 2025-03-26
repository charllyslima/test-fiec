import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import "@testing-library/jest-dom";

describe("LoginPage", () => {
    it("renderiza corretamente os elementos principais", () => {
        render(<LoginPage />);

        expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(1);

        expect(screen.getByRole("heading", { name: /entrar/i })).toBeInTheDocument();

        expect(screen.getByText(/entre com suas credenciais/i)).toBeInTheDocument();

        expect(screen.getByText("Mocked LoginForm")).toBeInTheDocument();

        const link = screen.getByRole("link", { name: /cadastre-se aqui/i });
        expect(link).toHaveAttribute("href", "/register");
    });
});
