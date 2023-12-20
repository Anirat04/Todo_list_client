import { Outlet } from "react-router-dom";
import Navbar from "./Pages/Shared/Navbar/Navbar";


const Layout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="max-w-[1280px] mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;