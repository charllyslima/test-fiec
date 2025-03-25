import AdminLayout from "@/layouts/admin-layout";
import {ReactNode} from "react";

export default function AdminPageLayout({children}: { children: ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}
