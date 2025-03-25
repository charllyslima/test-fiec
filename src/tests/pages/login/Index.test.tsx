import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from "@/pages/login";
import '@testing-library/jest-dom';

describe('LoginPage', () => {
    it('deve renderizar o formulário de login', () => {
        render(<LoginPage />);

        // Verifica se os campos de email e senha estão no documento
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('deve exibir uma mensagem de erro se os campos estiverem vazios', () => {
        render(<LoginPage />);

        // Submete o formulário sem preencher os campos
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        // Verifica se a mensagem de erro é exibida
        expect(screen.getByText(/por favor, preencha todos os campos/i)).toBeInTheDocument();
    });

    it('deve exibir uma mensagem de sucesso ao fazer login com credenciais corretas', () => {
        render(<LoginPage />);

        // Preenche os campos com dados corretos
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });

        // Submete o formulário
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        // Verifica se a mensagem de sucesso aparece
        expect(screen.getByText(/bem-vindo, você está logado!/i)).toBeInTheDocument();
    });

    it('deve exibir uma mensagem de erro ao tentar fazer login com credenciais inválidas', () => {
        render(<LoginPage />);

        // Preenche os campos com dados inválidos
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senhaErrada' } });

        // Submete o formulário
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        // Verifica se a mensagem de erro aparece
        expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
});
