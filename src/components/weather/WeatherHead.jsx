/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import CloudIcon from "../../assets/cloud.svg";
import HazeIcon from "../../assets/haze.svg";
import SnowIcon from "../../assets/icons/snow.svg";
import SunnyIcon from "../../assets/icons/sunny.svg";
import PinIcon from "../../assets/pin.svg";
import RainIcon from "../../assets/rainy.svg";
import ThunderIcon from "../../assets/thunder.svg";
import { getFormattedDateTime } from "../utils/helper";

export default function WeatherHead({data}) {

    function getWeatherIcon(climate) {
        switch (climate) {
            case "rain":
                return RainIcon;
            case "clouds":
                return CloudIcon;
            case "clear":
                return SunnyIcon;
            case "snow":
                return SnowIcon;
            case "thunder":
                return ThunderIcon;
            case "fog":
                return HazeIcon;
            case "haze":
                return HazeIcon;
            case "mist":
                return HazeIcon;

            default:
                return SunnyIcon;
        }
    }

    return (
        <div className="flex flex-col justify-between brightness-110">
            <div className="max-md:flex flex-wrap gap-3 items-center justify-between md:-mt-10">
                <img className="w-[30px] h-[30px] brightness-120" src={ getWeatherIcon(data.icon) } alt="climateIcon?" />
                <div className="max-md:flex items-center max-md:space-x-4 ">
                    <h1 className="text-[20px] lg:text-[40px] xl:text-[60px] leading-none md:mb-4">{ data.temperature} °C</h1>
                    <div className="flex items-center space-x-4 md:mb-4">
                        <img src={ PinIcon } />
                        <h2 className="text-2xl leading-tight text-yellow-800 ">{ data.city }</h2>
                    </div>
                </div>
                <div>
                    <p className="text-sm lg:text-lg">
                          { getFormattedDateTime( data.time ) } 
                    </p>
                </div>
            </div>
            
            <div className="flex gap-2 items-center">
                <p className="text-sm lg:text-lg text-blue-900">{ data.description }</p>
                {
                    data.climate && (<img className="w-[35px] h-[35px]" src={data.climate} alt="" />)
                }
            </div>
        </div>
    );
}