import { NavbarMobile } from './navbarmobile';
import NavbarRoutes from "@/components/navbar-routes";
export const Navbar = () => {
    return (
        <div className="bg-white h-full flex items-center justify-between shadow-md">
            {/*<div className="flex items-center">*/}
            {/*    <div className="text-2xl font-bold text-gray-800 ml-5">Dashboard</div>*/}
            {/*</div>*/}
            {/*<div className="flex items-center">*/}
            {/*    <div className="flex items-center">*/}
            {/*        <div className="text-gray-800 mr-5">John Doe</div>*/}
            {/*        <div className="bg-gray-800 text-white px-3 py-1 rounded-full mr-5">JD</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <NavbarMobile />
            <NavbarRoutes />
        </div>
    );
}

export default Navbar;
