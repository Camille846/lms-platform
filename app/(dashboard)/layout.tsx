import {Sidebar} from './_components/sidebar';
import {Navbar} from './_components/navbar';
import {ReactNode} from 'react';
const DashboardLayout = ({ children } : { children: ReactNode }) => {
    return (
        <div className="h-full flex">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
              <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="p-5 pt-[80px]">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
