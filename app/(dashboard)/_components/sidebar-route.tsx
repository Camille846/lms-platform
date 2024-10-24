"use client"
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useState, useEffect} from "react";

interface SidebarRouteProps {
    name: string;
    icon: any;
    href: string;
}

export const SidebarRoute = ({ name, icon: Icon, href }: SidebarRouteProps) => {
    const pathname = usePathname();
    const router = useRouter();

    // Define o estado 'isActive' e inicializa com base na URL atual
    const [isActive, setIsActive] = useState<boolean>(false);
    useEffect(() => {
        setIsActive(pathname === href || pathname?.startsWith(`${href}/`));
    }, [pathname, href]);

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex p-3 items-center gap-x-2 mb-2 ml-3 mr-3 text-[#A4B2BC] text-sm font-[500] pl-6 rounded-3xl transition-colors duration-200 ease-in-out hover:bg-[#01406C] hover:text-white",
                isActive && "bg-[#01406C] text-white" // Aplica estilos quando ativo
            )}
        >
            <div className="flex items-center gap-x-2 py-1 hover:text-white">
                <Icon
                    size={24}
                    className={cn(
                        "text-[#A4B2BC] transition-colors duration-200 ease-in-out",
                        isActive && "text-white" // Aplica estilos quando ativo
                    )}
                />
                <span>{name}</span>
            </div>
        </button>
    );
}
