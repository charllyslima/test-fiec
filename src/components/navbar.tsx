import React from "react";
import {SlMenu} from "react-icons/sl";
import Menu from "@/components/menu";
import LogoutButton from "@/components/logout-button";

const Navbar = ({children}: { children: React.ReactNode }) => {


    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full flex justify-between lg:justify-end">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <SlMenu/>
                        </label>
                    </div>
                    <div className="">
                        <details className="dropdown dropdown-end">
                            <summary
                                className="btn rounded-full bg-transparent border-0 shadow-none hover:bg-transparent">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                        <span className="text-xs">CH</span>
                                    </div>
                                </div>
                            </summary>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
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
