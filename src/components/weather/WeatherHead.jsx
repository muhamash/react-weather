import PinIcon from "../../assets/pin.svg";
import { useWeatherContext } from "../context/useWeatherProvider";

export default function WeatherHead ()
{
    
    const { data } = useWeatherContext();

    return (
        <div>
            <div className="max-md:flex items-center justify-between md:-mt-10">
                <img src="../../assets/cloud.svg" alt="climateIcon?" />
                <div className="max-md:flex items-center max-md:space-x-4">
                    <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">{ data.temp } F</h1>
                    <div className="flex items-center space-x-4 md:mb-4">
                        <img src={ PinIcon } />
                        <h2 className="text-2xl lg:text-[50px]">{  }</h2>
                    </div>
                </div>
            </div>
            <p className="text-sm lg:text-lg">{  }</p>
        </div>
    );
}
