import { useContext } from "react";
import Banner from "./HomeComponents/Banner/Banner";
import Benefit from "./HomeComponents/Benefit/Benefit";
import { ProviderContext } from "../../../Provider/Provider";


const Home = () => {
    const { loading } = useContext(ProviderContext)

    return (
        <div>
            <Banner></Banner>
            {
                loading ? <span className="loading loading-spinner text-error"></span>
                : 
                <Benefit></Benefit>
            }
        </div>
    );
};

export default Home;