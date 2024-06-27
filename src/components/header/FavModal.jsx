/* eslint-disable react/prop-types */
// import React from 'react';
import { Link } from 'react-router-dom';
import { useFav } from '../hooks/useFav';
import { useFetch } from '../hooks/useFetch';

export default function FavModal({ onShow }) {
    const { fav } = useFav();
    const { setEndpoint } = useFetch();
    console.log(fav);

    // const handleClick = (e) => {
    //     e.stopPropagation();
    // };
    const handleCLick = async (f) => {
        try {
            // const coords = await geocode(f);
            setTimeout( () =>
            {
                setEndpoint( f );
            }, 500 );
        } catch (error) {
            console.error('Error in handleClick:', error);
        }
    };
    
    return (
        <div onClick={onShow} className="max-w-xs py-4  bg-opacity-90  brightness-125 rounded-md  transition-all duration-150 ease-in-out absolute z-50 right-0 top-16 shadow-lg text-white hover:text-black  bg-black/20  backdrop-blur-md border-[1.2px] border-sky-500">
            <div>
                <h3 className="text-sm font-mono px-4">Favorite Locations:</h3>
                {fav.length !== 0 ? (
                    <div className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer flex flex-col">
                        {fav.map((f, index) => (
                            <Link to='/' key={index} onClick={()=>  handleCLick(f) }
                                className=" hover:bg-slate-400">
                                 {f}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm font-thin text-center py-3">no data in there</p>
                )}
            </div>
        </div>
    );
}