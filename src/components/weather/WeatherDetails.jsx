/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import CloudyIcon from "../../assets/icons/cloud.svg";
import HumidityIcon from "../../assets/icons/humidity.svg";
import TempMaxIcon from "../../assets/icons/temp-max.svg";
import TempMinIcon from "../../assets/icons/temp-min.svg";
import WindIcon from "../../assets/icons/wind.svg";

export default function WeatherDetails ()
{

    return (
        <div>
            <p className="text-sm lg:text-lg   mb-8 ">Today's brief: <span className="text-red-500 font-mono uppercase">{  }</span></p>
            <ul className="space-y-6 lg:space-y-6">
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Temp max</span>
                    <div className="inline-flex space-x-4">
                        <p>{  } F</p>
                        <img src={TempMaxIcon} alt="temp-max" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Temp min</span>
                    <div className="inline-flex space-x-4">
                        <p>{ } F</p>
                        <img src={TempMinIcon} alt="temp-min" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Humidity</span>
                    <div className="inline-flex space-x-4">
                        <p>{  } %</p>
                        <img src={HumidityIcon} alt="humidity" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Cloudy</span>
                    <div className="inline-flex space-x-4">
                        <p>{  } %</p>
                        <img src={CloudyIcon} alt="cloudy" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Wind</span>
                    <div className="inline-flex space-x-4">
                        <p>{ } kph</p>
                        <img src={WindIcon} alt="wind" />
                    </div>
                </li>
            </ul>
        </div>
    );
}
