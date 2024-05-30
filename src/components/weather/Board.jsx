/* eslint-disable no-unused-vars */
// import React from 'react'
import useFetchQuery from '../hooks/useFetchData';
import AddFav from './AddFav';
import WeatherDetails from './WeatherDetails';
import WeatherHead from './WeatherHead';

export default function Board ()
{
    const { data: weatherData, isLoading: weatherDataLoading, isError: weatherDataError } = useFetchQuery( {
        queryKey: [ 'weatherData' ],
        url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=4KCCBKNJQFYH8DKD2FMZQHBBT',
        onSuccess: ( data ) =>
        {
            console.log( "Data fetched successfully:", data );
        },
    } );

    console.log( weatherData);

    return (
        <div className="container">
            <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto">
                <div className="grid md:grid-cols-2 gap-10 md:gap-6">
                    <p>found:</p>
                    <AddFav />
                    <WeatherHead />
                    <WeatherDetails />
                </div>
            </div>
        </div>
    );
}
