import React from "react";
import ThemeSwitcher from "@/components/theme-switcher";
import Menu from "@/components/menu";

const Sidebar = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="drawer lg:drawer-open h-full">
            <ThemeSwitcher/>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content p-5">
                {children}
            </div>

            <div className="drawer-side shadow-xl h-[calc(100vh_-_65px)]">
                <Menu/>
            </div>
        </div>
    );
};

export default Sidebar;
