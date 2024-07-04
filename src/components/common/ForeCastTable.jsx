/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ScatterdCloudsImage from "../../assets/cloud.svg";
import { default as SnowImage, default as WinterImage } from "../../assets/icons/snow.svg";
import MistImage from "../../assets/icons/wind.svg";
import RainyDayImage from "../../assets/rainy.svg";
import ClearSkyImage from "../../assets/sun.svg";
import ThunderStormImage from "../../assets/thunder.svg";
import { getFormattedDateTime, temp } from "../utils/helper";

export default function ForeCastTable ( { time, icon, temperature, wind, pressure, humidity } )
{
    function getIcon ( climate )
    {
        switch ( climate )
        {
            case "Rain":
                return RainyDayImage;
            case "Clouds":
                return ScatterdCloudsImage;
            case "Clear":
                return ClearSkyImage;
            case "Snow":
                return SnowImage;
            case "Thunder":
                return ThunderStormImage;
            case "Fog":
                return WinterImage;
            case "Haze":
                return MistImage;
            default:
                return ClearSkyImage;
        }
    }
    
    return (
        <div>
            <div className="px-6 text-center bg-gray-50 py-4 whitespace-nowrap text-sm text-gray-800">{ getFormattedDateTime( time ) }</div>
            <table className="min-w-full divide-y divide-gray-200">
            
                <thead className="">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">State</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Temp</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Wind</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Pressure</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Humidity</th>
                    </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <img src={ getIcon( icon ) } alt="" className="w-8 h-8" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ temp( temperature ) }</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ wind } m/s</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ pressure } Kpa</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ humidity } %</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}