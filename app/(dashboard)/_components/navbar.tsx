import { NavbarMobile } from './navbarmobile';
import NavbarRoutes from "@/components/navbar-routes";
export const Navbar = () => {
    return (
        <div className="bg-white h-full flex items-center justify-between shadow-md">
            <NavbarMobile />
            <NavbarRoutes />
        </div>
    );
}

export default Navbar;
