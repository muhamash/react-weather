/* eslint-disable react/prop-types */
// import React from 'react';
import { useFav } from '../hooks/useFav';
import { useFetch } from '../hooks/useFetch';

export default function FavModal({ onShow }) {
    const { fav } = useFav();
    const { setEndpoint } = useFetch();
    console.log(fav);

    // const handleClick = (e) => {
    //     e.stopPropagation();
    // };

    return (
        <div onClick={onShow} className="max-w-xs py-4 bg-orange-500 bg-opacity-70 brightness-125 rounded-md border-[1px] transition-all duration-150 ease-in-out border-sky-500 absolute z-50 right-0 top-16 shadow-lg text-black">
            <div>
                <h3 className="text-sm font-mono px-4">Favorite Locations:</h3>
                {fav.length !== 0 ? (
                    <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
                        {fav.map((f, index) => (
                            <li
                                onClick={() => setEndpoint(f)}
                                className=" hover:bg-slate-400"
                                key={index}
                            >
                                {f}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm font-thin text-center py-3">no data in there</p>
                )}
            </div>
        </div>
    );
}