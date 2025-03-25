"use client"
import React from "react";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await signOut({redirect: false});

        router.push("/login");
    };

    return <a onClick={handleLogout}>Sair</a>
}

export default LogoutButton;