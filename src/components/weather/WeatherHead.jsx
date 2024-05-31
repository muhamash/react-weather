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
        <div className="flex flex-col justify-between">
            <div className="max-md:flex items-center justify-between md:-mt-10">
                <img src={ getWeatherIcon( data.days[ 0 ].icon ) } alt="climateIcon?" />
                <div className="max-md:flex items-center max-md:space-x-4">
                    <h1 className="text-[40px] lg:text-[60px] xl:text-[80px] leading-none md:mb-4">{ data.days[ 0 ].temp } F</h1>
                    <div className="flex items-center space-x-4 md:mb-4">
                        <img src={ PinIcon } />
                        <h2 className="text-2xl lg:text-[50px]">{ data.address }</h2>
                    </div>
                </div>
                <div>
                <p className="text-sm lg:text-lg">
                    { getFormattedDateTime( data.days[ 0 ].datetime ) }
                </p>
            </div>
            </div>
            
            <p className="text-sm lg:text-lg text-blue-900">{ data.days[ 0 ].description }</p>
        </div>
    );
}