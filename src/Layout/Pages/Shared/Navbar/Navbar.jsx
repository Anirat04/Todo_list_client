import './Navbar.css'
import logoPNG from '../../../../assets/Todoist_logo.png'
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ProviderContext } from '../../../../Provider/Provider';

const Navbar = () => {
    const { user, logOut, loading } = useContext(ProviderContext)
    const navlinks = <>
        <NavLink to="/"><li>Home</li></NavLink>
        <NavLink to="/pricing"><li>Pricing</li></NavLink>
        <NavLink to="/taskManagement"><li>Dashboard</li></NavLink>
        <NavLink to="/profile"><li>Profile</li></NavLink>
    </>

    // this event handler is to log out users from the server
    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('user logged out')
            })
            .catch(error => console.log('error logging out', error))
    }


    return (
        <div className='shadow-md bg-[#fcf5ee]'>
            <div className="navbar max-w-[1280px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </ul>
                    </div>
                    <Link to='/'>
                        <img src={logoPNG} className='w-[160px]' alt="website_logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-7 text-[18px] font-semibold">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="ml-[10px] border border-black rounded-full">
                        {
                            user ? <div className="bg-white flex flex-row-reverse items-center gap-3 rounded-full">
                                <Link className="border border-black rounded-full bg-base-300">
                                    <img className="max-w-[45px] min-h-[45px] rounded-full" src={user.photoURL ? user.photoURL : 'https://i.ibb.co/N7JQLnY/user-default-image.jpg'} alt="" />
                                </Link>
                                <p className="pl-[15px] font-bold">{user.displayName ? user.displayName : "userName_null"}</p>
                            </div>
                                :
                                <div className="hidden bg-base-300 md:flex flex-row-reverse items-center gap-5 rounded-full">
                                    <Link className="border border-black rounded-full bg-base-300">
                                        <img className="max-w-[45px] min-h-[45px] rounded-full" src='https://i.ibb.co/N7JQLnY/user-default-image.jpg' alt="" />
                                    </Link>
                                    <p className="pl-[20px] font-bold">No User</p>
                                </div>
                        }
                    </div>
                    <div className="ml-[10px]">
                        {
                            loading ? <>
                            </>
                                : <>
                                    {
                                        user ? <>
                                            <button
                                                className="btn text-white bg-[#e5412e] rounded-lg hover:bg-transparent hover:border-[#e5412e] hover:text-[#e5412e]"
                                                onClick={handleLogOut}
                                            >
                                                Logout
                                            </button>
                                        </>
                                            : <Link to="/login">
                                                <button className="btn text-white bg-[#e5412e] rounded-lg hover:bg-transparent hover:border-[#e5412e] hover:text-[#e5412e]">Login</button>
                                            </Link>
                                    }
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;