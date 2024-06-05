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
                        <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 p-5 min-h-[520px] max-w-[1058px] mx-auto">
                            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
                                <AddFav />
                                <WeatherHead data={ data } />
                                <WeatherDetails data={ data } />
                                <div className="p-1 md:flex gap-3">
                                    <div className='shadow-md rounded-md'>
                                        <p className="text-rose-600 py-1 bg-opacity-10 mix-blend-multiply text-md bg-white text-center">Get updated with live rain radar!
                                        </p>
                                        {/* <div>
                                        <React.Suspense fallback={ <p>loading.....</p> }>
                                            <MapApp data={ data } />
                                        </React.Suspense>
                                    </div> */}
                                        <MapApp lat={ data.lat } lon={ data.lon } />
                                    </div>
                                    <div className='shadow-md rounded-md'>
                                        <p className="text-rose-600 py-1 bg-opacity-10 mix-blend-multiply text-md bg-white text-center">Get updated with live wind direction!
                                        </p>
                                        <WindyMap lat={ data.lat } lon={ data.lon }/>
                                    </div>
                                    <div className='shadow-md rounded-md'>
                                        <p className="p-1 text-md text-center text-rose-700">Data forecasts of the day!</p>
                                        <ForecastTable forecastDay={data}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-10 flex items-center justify-center">
                        <HashLoader color="#36d7b7" />
                    </div>
                ) }
        </>
    );
}
