/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { HashLoader } from 'react-spinners';
import AddFav from './AddFav';
import WeatherDetails from './WeatherDetails';
import WeatherHead from './WeatherHead';

export default function Board ({data})
{

    return (
        <>
            {
                data ? (
                    <div className="container mt-3 z-0">
                        <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 p-[20px] min-h-[520px] max-w-[1058px] mx-auto">
                            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
                                <AddFav />
                                <WeatherHead data={ data } />
                                <WeatherDetails data={ data } />
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
