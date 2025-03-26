"use client";

import EditProfileForm from "@/app/admin/profile/components/edit-profile-form";
import {Toaster} from "react-hot-toast";
import React from "react";
import {SessionProvider} from "next-auth/react";

const ProfilePage = () => {
    return (
        <SessionProvider>
            <div className="max-w-2xl mx-auto p-6 space-y-10">
                <h1 className="text-2xl font-semibold">Perfil</h1>
                <Toaster position="bottom-center" reverseOrder={false}/>
                <section className={`card bg-base-100 p-5 shadow-xl`}>
                    <h2 className="text-xl font-medium mb-4">Informações do Perfil</h2>
                    <EditProfileForm/>
                </section>
            </div>
        </SessionProvider>
    );
};

export default ProfilePage;
