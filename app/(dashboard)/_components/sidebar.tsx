import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
export const Sidebar = () => {
    return (
        <div className="text-[#01406C] bg-white w-56 h-screen flex flex-col border-r shadow-sm overflow-y-auto w-full">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}



