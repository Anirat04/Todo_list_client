import React from 'react';
import logoPNG from '../../../../assets/Todoist_logo.png'
import { FaFacebook, FaLinkedin, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className='bg-[#fcf5ee] '>
                <footer className="footer p-10 bg-[#fcf5ee] text-base-content max-w-[1280px] mx-auto">
                    <aside>
                        <img src={logoPNG} alt="" className='w-[180px]' />
                        <p>ACME Industries Ltd.<br />Providing reliable tech since 1992</p>
                    </aside>
                    <nav>
                        <header className="footer-title">Services</header>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Company</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <form>
                        {/* <header className="footer-title">Newsletter</header> */}
                        <fieldset className="form-control w-80">
                            <nav className='mb-[40px]'>
                                <header className="footer-title">Social</header>
                                <div className="grid grid-flow-col gap-4">
                                    <FaYoutube className='text-[24px] hover:text-[#e5412e]'></FaYoutube>
                                    <FaFacebook className='text-[24px] hover:text-[#e5412e]'></FaFacebook>
                                    <FaLinkedin className='text-[24px] hover:text-[#e5412e]'></FaLinkedin>
                                    <FaTwitter className='text-[24px] hover:text-[#e5412e]'></FaTwitter>
                                </div>
                            </nav>
                            <div className="join">
                                <label
                                    htmlFor="Title"
                                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#e5412e] focus-within:ring-1 focus-within:ring-[#e5412e]"
                                >
                                    <input
                                        type="text"
                                        id="Title"
                                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-[40px] pl-3"
                                        placeholder="Title"
                                    />

                                    <span
                                        className="pointer-events-none bg-[#fcf5ee] absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                    >
                                        Enter your email address
                                    </span>
                                </label>
                                <button className="btn btn-primary text-white bg-[#e5412e] border-[#e5412e] hover:bg-transparent hover:border-[#e5412e] hover:text-[#e5412e] join-item">Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                </footer>
            </div>
            <div className="divider mt-0 mb-0 h-0"></div>
            <footer className="footer footer-center p-4 bg-[#fcf5ee] text-base-content">
                <aside>
                    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;