import {ReactNode} from "react";
import Navbar from "@/components/navbar";
import ThemeSwitcher from "@/components/theme-switcher";

export default function AdminLayout({children}: { children: ReactNode }) {

    return (
        <div className="min-h-screen flex">
            <Navbar>
                <ThemeSwitcher/>
                <div className="h-[calc(100vh_-_65px)] overflow-y-auto p-5">
                    {children}
                </div>

            </Navbar>

        </div>
    );
}
