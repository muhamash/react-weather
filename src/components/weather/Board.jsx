/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { HashLoader } from 'react-spinners';
import LeafletMap from '../map/Leaflet';
import AddFav from './AddFav';
import WeatherDetails from './WeatherDetails';
import WeatherHead from './WeatherHead';


export default function Board ({data})
{

    return (
        <>
            {
                data ? (
                    <div className="container mt-5">
                        <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto">
                            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
                                <AddFav />
                                <WeatherHead data={ data } />
                                <WeatherDetails data={ data } />
                                <div className="p-1 shadow-md rounded-md">
                                    {/* <p className="text-cyan-900 text-md bg-white text-center">Get update the wind direction!
                                    </p> */}
                                    {/* <div>
                                        <React.Suspense fallback={ <p>loading.....</p> }>
                                            <MapApp data={ data } />
                                        </React.Suspense>
                                    </div> */}
                                    <div>
                                        <LeafletMap lat={ data.lat } lon={data.lon} />
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
