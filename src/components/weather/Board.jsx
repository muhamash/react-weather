/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
import AddFav from './AddFav';
import WeatherDetails from './WeatherDetails';
import WeatherHead from './WeatherHead';

export default function Board ({data})
{
    

    return (
        <>
            {
            data ? (
            <div className="container">
            <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto">
                <div className="grid md:grid-cols-2 gap-10 md:gap-6">
                    <AddFav />
                    <WeatherHead data={data} />
                    <WeatherDetails data={data} />
                </div>
            </div>
        </div>
        ): (
            <div>no data</div>
        )}
        </>
    );
}
