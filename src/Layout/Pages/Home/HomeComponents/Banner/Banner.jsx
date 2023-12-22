import { Link } from 'react-router-dom';
import bannerSVG from '../../../../../assets/Business_SVG.svg'
import React from "react";
import Lottie from "lottie-react";
import bannerAnnimation from "./Animation - 1703198623422.json";
const Banner = () => {
    return (
        <div className='shadow-sm w-full'>
            <section className=" text-gray-900 max-w-[1280px] mx-auto">
                <div className="container flex flex-col justify-center px-6 mx-auto sm:py-12 lg:pb-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-[48px] font-bold sm:text-[60px] md:leading-[80px]">Keep it all together
                            <span className="text-[#e5412e] pt-5"> with Todoist. </span>
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                            <span className="hidden md:inline lg:hidden">turpis pulvinar, est scelerisque ligula sem </span>
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link
                                to='/taskManagement'
                                className="px-8 py-3 text-lg font-semibold rounded bg-[#e5412e] text-white hover:bg-transparent hover:text-[#e5412e] hover:border hover:border-[#e5412e] transition ease-linear duration-300"
                            >
                                Let’s Explore
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        {/* <img src={bannerSVG} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}
                        <Lottie animationData={bannerAnnimation} loop={true} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;