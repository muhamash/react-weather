/* eslint-disable react/prop-types */
// import React from 'react';
import { useFav } from '../hooks/useFav';
import { useFetch } from '../hooks/useFetch';

export default function FavModal({ onShow }) {
    const { fav } = useFav();
    const { setEndpoint } = useFetch();
    console.log(fav);

    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div onClick={onShow} className="max-w-xs py-4 bg-white mix-blend-multiply bg-opacity-70 rounded-md border-[1px] transition-all duration-150 ease-in-out border-sky-500 absolute right-0 top-16 text-black shadow-lg">
            <div onClick={handleClick}>
                <h3 className="text-sm font-mono text-green-700 px-4">Favorite Locations:</h3>
                {fav.length !== 0 ? (
                    <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
                        {fav.map((f, index) => (
                            <li
                                onClick={() => setEndpoint(f)}
                                className="hover:bg-slate-400"
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