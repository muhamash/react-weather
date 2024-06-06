/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { HashLoader } from 'react-spinners';
import MapApp from '../map/MapApp';
import WindyMap from '../map/WIndyMap';
import AddFav from './AddFav';
import ForecastTable from './ForeCastTable';
import WeatherDetails from './WeatherDetails';
import WeatherHead from './WeatherHead';

export default function Board ({data})
{

    return (
        <>
            {
                data ? (
                    <div className="container mt-5">
                        <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 p-3 min-h-[520px] max-w-[1058px] mx-auto">
                            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
                                <AddFav />
                                <WeatherHead data={ data } />
                                <WeatherDetails data={ data } />
                                <div className="p-1 md:flex mx-auto gap-5 brightness-80 w-[83%]">
                                    <div className='mx-auto py-3 w-[300px] h-[200px]'>
                                         <p className="py-1 text-lg text-center bg-gray-200 rounded-t-md font-bold">
                                            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text mix-blend-multiply">
                                                The Rain Radar:
                                            </span>
                                        </p>
                                        <MapApp lat={ data.lat } lon={ data.lon } />
                                    </div>
                                    <div className='w-fit mx-auto py-3'>
                                        <p className="py-1 text-lg text-center bg-gray-200 rounded-t-md font-bold">
                                            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text mix-blend-multiply">
                                                The Wind Radar:
                                            </span>
                                        </p>
                                        <WindyMap lat={ data.lat } lon={ data.lon } />
                                    </div>
                                    <div className='w-fit mx-auto py-3'>
                                         <p className="py-1 text-lg text-center bg-gray-200 rounded-t-md font-bold">
                                            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text mix-blend-multiply">
                                                Forecast of the hours(Day):
                                            </span>
                                        </p>
                                        <ForecastTable forecastDay={ data } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="py-10 flex items-center justify-center">
                            <p>please permission allow your location service!!!</p>
                            <HashLoader color="#36d7b7" />
                    </div>
                ) }
        </>
    );
}
