import { TiThMenu } from "react-icons/ti";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Sidebar} from "@/app/(dashboard)/_components/sidebar";
export const NavbarMobile = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ml-6">
                    <TiThMenu className="text-2xl text-gray-800 mr-5" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default NavbarMobile;
