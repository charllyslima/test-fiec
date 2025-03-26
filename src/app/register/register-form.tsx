"use client";

import React, {useState, useCallback} from "react";
import InputField from "@/app/login/components/input-field";
import {useRouter} from "next/navigation";
import ErrorMessage from "@/app/login/components/error-message";
import UserService from "@/services/user-service";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError(null);

            // Validações básicas
            if (!name || !email || !password || !confirmPassword) {
                setError("Todos os campos são obrigatórios.");
                setLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setError("As senhas não coincidem.");
                setLoading(false);
                return;
            }

            UserService.createUser(name, email, password).then(() => {
                router.push("/login")
            })
                .catch(() => {
                    setError("Ocorreu um erro desconhecido");
                });

        },
        [name, email, password, confirmPassword, router]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {error && <ErrorMessage message={error}/>}

            <InputField
                label="Nome"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                errorMessage="Digite seu nome"
            />
            <InputField
                label="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage="Entre com um endereço de email válido"
            />
            <InputField
                label="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage="Digite uma senha válida"
            />
            <InputField
                label="Confirmar senha"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                errorMessage="Repita a senha"
            />

            <button
                type="submit"
                className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
                disabled={loading}
            >
                {loading ? "Carregando..." : "Cadastrar"}
            </button>
        </form>
    );
};

export default RegisterForm;