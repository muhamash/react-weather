/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import CloudyIcon from "../../assets/icons/cloud.svg";
import HumidityIcon from "../../assets/icons/humidity.svg";
import TempMaxIcon from "../../assets/icons/temp-max.svg";
import TempMinIcon from "../../assets/icons/temp-min.svg";
import WindIcon from "../../assets/icons/wind.svg";

export default function WeatherDetails ({data})
{

    return (
        <div>
            <p className="text-sm lg:text-lg brightness-105   mb-8 ">Today's brief: <span className="text-red-700 font-mono uppercase">{ data.days[ 0 ].description }</span></p>
            <ul className="space-y-6 lg:space-y-6">
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Temp max</span>
                    <div className="inline-flex space-x-4">
                        <p>{ data.days[ 0 ].tempmax } F</p>
                        <img src={ TempMaxIcon } alt="temp-max" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Temp min</span>
                    <div className="inline-flex space-x-4">
                        <p>{ data.days[ 0 ].tempmin } F</p>
                        <img src={ TempMinIcon } alt="temp-min" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Humidity</span>
                    <div className="inline-flex space-x-4">
                        <p>{ data.days[ 0 ].humidity } %</p>
                        <img src={ HumidityIcon } alt="humidity" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Cloudy</span>
                    <div className="inline-flex space-x-4">
                        <p>{ data.days[ 0 ].cloudcover } %</p>
                        <img src={ CloudyIcon } alt="cloudy" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Wind</span>
                    <div className="inline-flex space-x-4">
                        <p>{ data.days[ 0 ].windspeed } kph</p>
                        <img src={ WindIcon } alt="wind" />
                    </div>
                </li>
            </ul>
        </div>
    );
}
