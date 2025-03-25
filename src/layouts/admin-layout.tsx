import {ReactNode} from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function AdminLayout({children}: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <Navbar>
                <Sidebar>
                    {children}
                </Sidebar>
            </Navbar>

        </div>
    );
}
