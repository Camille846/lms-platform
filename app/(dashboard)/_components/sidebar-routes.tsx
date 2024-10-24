"use client"

import { MdPlayCircle } from "react-icons/md";
import { FaHouseChimney, FaCirclePlay  } from "react-icons/fa6";
import {SidebarRoute} from "./sidebar-route";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { IoBarChart } from "react-icons/io5";
import {usePathname} from "next/navigation";

const playerRoutes = [
    { icon: FaHouseChimney, name: "Overview", href: "/" },
    { icon: FaCirclePlay , name: "Training", href: "/training" },
]

const adminRoutes = [
    { icon: TfiLayoutAccordionList, name: "Modules", href: "/admin/modules" },
    { icon: IoBarChart, name: "Analytics", href: "/admin/analytics" },
]

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isAdminPage = pathname?.includes('/admin');
    const routes = isAdminPage ? adminRoutes : playerRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarRoute key={index} icon={route.icon} name={route.name} href = {route.href} />
            ))}
        </div>
    );
}
