import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { PacmanLoader } from 'react-spinners';
import { useFetch } from '../hooks/useFetch';
import MapApp from './MapApp';
import Map from './Maptiler';

export default function LargeMap() {
    const { weatherData, error, isLoading } = useFetch();
    const [state, setState] = useState({ lat: null, lon: null });

    useEffect(() => {
        if (weatherData && weatherData.lat && weatherData.lon) {
            setState({ lat: weatherData.lat, lon: weatherData.lon });
        }
    }, [weatherData]);
    

    return (
        <div className="bg-black text-white">
            { isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <PacmanLoader size={ 120 } color="#3390c4" />
                </div>
            ) : error ? (
                <div>
                    <p>{ error || "Component failed!" }</p>
                </div>
            ) : (
                <div className="">
                    <div>
                        <p className="mx-auto text-lg text-center bg-gray-200 font-bold ">
                            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text mix-blend-multiply">
                                Map Containers:
                            </span>
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 mx-auto w-full gap-5 p-5">
                        <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
                            <div className="bg-green-600 w-full">
                                Live update rain radar:
                            </div>
                            <div className="w-full h-[320px]">
                                { state.lat && state.lon ? (
                                   <MapApp lat={state.lat} lon={state.lon}/>
                                ) : (
                                    <p>Fetching location...</p>
                                ) }
                            </div>
                        </div>
                        <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
                            <div className="bg-green-600 w-full">
                                Wind Layer:
                            </div>
                            <div className="w-full h-[320px]">
                                { state.lat && state.lon ? (
                                    <Map lat={ state.lat } lon={ state.lat } layer={ 'windLayer' } />
                                ) : (
                                    <p>Fetching location...</p>
                                ) }
                            </div>
                        </div>
                        <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
                            <div className="bg-green-600 w-full">
                                { name }
                            </div>
                            <div className="w-full h-[320px]">
                                { state.lat && state.lon ? (
                                    <Map lat={ state.lat } lon={ state.lat } layer={ 'pressureLayer' } />
                                ) : (
                                    <p>Fetching location...</p>
                                ) }
                            </div>
                        </div>
                        <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
                            <div className="bg-green-600 w-full">
                                { name }
                            </div>
                            <div className="w-full h-[320px]">
                                { state.lat && state.lon ? (
                                    <Map lat={ state.lat } lon={ state.lat } layer={ 'precipitationLayer' } />
                                ) : (
                                    <p>Fetching location...</p>
                                ) }
                            </div>
                        </div>
                        <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
                            <div className="bg-green-600 w-full">
                                { name }
                            </div>
                            <div className="w-full h-[320px]">
                                { state.lat && state.lon ? (
                                    <Map lat={ state.lat } lon={ state.lat } layer={ 'radarLayer' } />
                                ) : (
                                    <p>Fetching location...</p>
                                ) }
                            </div>
                        </div>
                        <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
                            <div className="bg-green-600 w-full">
                                { name }
                            </div>
                            <div className="w-full h-[320px]">
                                { state.lat && state.lon ? (
                                    <Map lat={ state.lat } lon={ state.lat } layer={ 'temperatureLayer' } />
                                ) : (
                                    <p>Fetching location...</p>
                                ) }
                            </div>
                        </div>
                                
                    </div>
                </div>
            ) }
            <div>
                <Outlet />
            </div>
        </div>
    );
}