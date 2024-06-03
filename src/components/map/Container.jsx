// import React from 'react';
import { RotateLoader } from 'react-spinners';
import { useFetch } from '../hooks/useFetch';

export default function Container ()
{
    const { coords } = useFetch();
    console.log( coords );
    return (
        <>
            { coords ? ( <div className='flex justify-center w-[300px] h-[200px] rounded-md'>
                <iframe
                    width='auto'
                    height='auto'
                    title='Windy Map'
                    src={ `https://embed.windy.com/embed2.html?lat=${coords.latitude}&lon=${coords.longitude}&detailLat=${coords.latitude}&detailLon=${coords.longitude}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=%C2%B0$C&radarRange=-1` }
                    frameBorder='0'>
                </iframe>
            </div> ) : ( <RotateLoader color="#36d7b7" /> ) }</>
    );
}

