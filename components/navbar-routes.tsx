"use client"
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { useClerk } from '@clerk/nextjs';

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isAdminPage = pathname?.startsWith('/admin');
    const isPlayerPage = pathname?.startsWith('/chapter');

    return (
        <div className="flex gap-x-4 ml-auto mr-6">
            {(isAdminPage || isPlayerPage) ? (
                <Link href="/">
                <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-x-2 bg-white border-2 border-white text-[#A4B2BC] text-sm font-[500] pl-3 pr-3 transition-colors duration-200 ease-in-out"
                >
                    <IoLogOut size={24} />
                    <span>Exit</span>
                </Button>
                </Link>
            ) : (
                <Link href="/admin/modules">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center border-2 border-white bg-white gap-x-2 text-[#A4B2BC] text-sm font-[500] pl-3 pr-3 transition-colors duration-200 ease-in-out">
                        <span>Admin Mode</span>
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    );
};

export default NavbarRoutes;
