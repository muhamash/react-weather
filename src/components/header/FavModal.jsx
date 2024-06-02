// import React from 'react';
import { useFav } from '../hooks/useFav';
export default function FavModal ()
{
    const { fav } = useFav();
    console.log(fav)
    return (
        <div className="max-w-xs py-4 bg-white mix-blend-multiply bg-opacity-70 rounded-md border-[1px] transition-all duration-150 ease-in-out border-sky-500 absolute right-0 top-16 text-black shadow-lg ">
            <h3 className="text-lg font-mono text-rose-500 px-4">Favorite Locations</h3>
            <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
                { fav.map( ( f, index ) => (
                    <li key={ index }>{ f }</li>
                ))}
            </ul>
        </div>
    );
}
