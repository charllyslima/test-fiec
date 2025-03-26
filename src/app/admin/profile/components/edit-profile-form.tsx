"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserService from "@/services/user-service";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const EditProfileForm = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setName(session.user.name || "");
            setEmail(session.user.email || "");
        }
    }, [status, session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        try {
            await UserService.updateUser(name, email, newPassword);
            toast.success("Perfil atualizado com sucesso");
            setNewPassword("");
            setConfirmPassword("");
        } catch (e: any) {
            console.error(e)
            toast.error("Erro ao atualizar perfil");
        }
    };

    const goToDashboard = () => {
        router.push('dashboard');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Nova senha</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Confirmar nova senha</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div className=" flex space-x-3 items-center justify-center">
                <button className="btn btn-secondary" type={`button`} onClick={goToDashboard}>
                    Voltar
                </button>
                <button type="submit" className="btn btn-primary">
                    Salvar alterações
                </button>

            </div>
        </form>
    );
};

export default EditProfileForm;
