"use client";

import React, {useEffect, useState} from "react";
import {FaRegMoon} from "react-icons/fa";
import {MdOutlineWbSunny} from "react-icons/md";

const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    if (theme === null) return null; // Evita piscar antes do estado carregar

    return (
        <div className="absolute z-30 p-3 bottom-6 right-6 dark:bg-white  bg-gray-500 rounded-full">
            <label className="swap swap-rotate cursor-pointer">
                <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    aria-label="Alternar tema"
                />

                <MdOutlineWbSunny className="swap-off h-7 w-7 text-white"/>
                <FaRegMoon className="swap-on h-7 w-7 text-black"/>
            </label>
        </div>
    );
};

export default ThemeSwitcher;
