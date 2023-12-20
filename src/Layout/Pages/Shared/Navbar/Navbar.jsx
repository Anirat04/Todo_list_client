import './Navbar.css'
import logoPNG from '../../../../assets/Todoist_logo.png'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const navlinks = <>
        <NavLink to="/task_management"><li>Task Management</li></NavLink>
        <NavLink><li>Blog</li></NavLink>
        <NavLink><li>Blog</li></NavLink>
        <NavLink><li>Blog</li></NavLink>
    </>


    return (
        <div className='shadow-md'>
            <div className="navbar bg-base-100 max-w-[1280px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <Link to='/'>
                        <img src={logoPNG} className='w-[160px]'  alt="website_logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-7 text-[18px] font-semibold">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;