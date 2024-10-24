"use client"
import {UserButton} from "@clerk/nextjs";

export const NavbarRoutes = () => {
    return (
        <div className="flex gap-x-2 ml-auto mr-6">
            <UserButton />
        </div>
    );
}

export default NavbarRoutes;
