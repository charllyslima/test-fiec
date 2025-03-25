"use client";

import React, {useState, useCallback} from "react";
import {signIn} from "next-auth/react";
import InputField from "@/app/login/components/input-field";
import {useRouter} from "next/navigation";
import ErrorMessage from "@/app/login/components/error-message";

// Componente de Exibição de Erro


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError(null);

            // Validação simples
            if (!email || !password) {
                setError("Email e senha são obrigatórios.");
                setLoading(false);
                return;
            }

            try {
                const res = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (res?.error) {
                    throw new Error(res.error);
                }


                router.push("/admin/dashboard");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Ocorreu um erro desconhecido");
                }
            } finally {
                setLoading(false);
            }
        }, [email, password, router]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {error && <ErrorMessage message={error}/>}

            <InputField
                label="E-mail"
                type="email"
                name="email"
                value={email}
                errorMessage="Entre com um endereço de email válido"
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                label="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage=""
            />
            <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                    Esqueceu a senha?
                </a>
            </div>
            <button
                type="submit"
                className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
                disabled={loading}
            >
                {loading ? "Carregando..." : "Entrar"}
            </button>
        </form>
    );
};

export default LoginForm;
