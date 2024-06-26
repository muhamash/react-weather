/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CloudyIcon from "../../assets/icons/cloud.svg";
import HumidityIcon from "../../assets/icons/humidity.svg";
import TempMaxIcon from "../../assets/icons/temp-max.svg";
import TempMinIcon from "../../assets/icons/temp-min.svg";
import WindIcon from "../../assets/icons/wind.svg";

export default function WeatherDetails({ data }) {
    return (
        <>
            {data ? (
                <div>
                    <p className="text-sm lg:text-lg brightness-105 mb-8">
                        Today's brief: <span className="text-red-700 font-mono uppercase">{data.brief}</span>
                    </p>
                    <ul className="space-y-6 lg:space-y-6">
                        <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                            <span>Temp max</span>
                            <div className="inline-flex space-x-4">
                                <p>{data.maxTemperature} °C</p>
                                <img src={TempMaxIcon} alt="temp-max" />
                            </div>
                        </li>
                        <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                            <span>Temp min</span>
                            <div className="inline-flex space-x-4">
                                <p>{data.minTemperature} °C</p>
                                <img src={TempMinIcon} alt="temp-min" />
                            </div>
                        </li>
                        <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                            <span>Humidity</span>
                            <div className="inline-flex space-x-4">
                                <p>{data.humidity} %</p>
                                <img src={HumidityIcon} alt="humidity" />
                            </div>
                        </li>
                        <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                            <span>Cloudy</span>
                            <div className="inline-flex space-x-4">
                                <p>{data.cloudPercentage} %</p>
                                <img src={CloudyIcon} alt="cloudy" />
                            </div>
                        </li>
                        <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                            <span>Wind</span>
                            <div className="inline-flex space-x-4">
                                <p>{data.wind} kph</p>
                                <img src={WindIcon} alt="wind" />
                            </div>
                        </li>
                    </ul>
                </div>
            ) : (
                <div>
                    <Skeleton count={1} height={30} />
                    <Skeleton count={4} height={30} style={{ marginTop: '10px' }} />
                </div>
            )}
        </>
    );
}