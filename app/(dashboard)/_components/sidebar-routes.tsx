"use client"

import { MdPlayCircle } from "react-icons/md";
import { FaHouseChimney, FaCirclePlay  } from "react-icons/fa6";
import {SidebarRoute} from "./sidebar-route";

const definingRoutes = [
    { icon: FaHouseChimney, name: "Overview", href: "/" },
    { icon: FaCirclePlay , name: "Training", href: "/training" },
]


export const SidebarRoutes = () => {
    const routes = definingRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarRoute key={index} icon={route.icon} name={route.name} href = {route.href} />
            ))}
        </div>
    );
}
