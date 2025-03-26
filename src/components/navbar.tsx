"use client";

import React from "react";
import Menu from "@/components/menu";
import LogoutButton from "@/components/logout-button";
import {FaRegUser} from "react-icons/fa";
import {useRouter} from "next/navigation";

const Navbar = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();

    function goToProfile() {
        router.push('profile');
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full flex justify-end">
                    <div className="">
                        <details className="dropdown dropdown-end">
                            <summary
                                className="btn rounded-full bg-transparent border-0 shadow-none hover:bg-transparent">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content p-3 rounded-full">
                                        <FaRegUser/>
                                    </div>
                                </div>
                            </summary>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                    <a onClick={goToProfile}>Perfil</a>
                                </li>
                                <li>
                                    <LogoutButton/>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <Menu/>
            </div>
        </div>
    );
};

export default Navbar;
