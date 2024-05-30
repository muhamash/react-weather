// import React from 'react';

export default function FavModal() {
    return (
        <div className="max-w-xs py-4 bg-white rounded-md border-[1px] border-sky-500 absolute right-0 top-16 text-black shadow-lg ">
            <h3 className="text-lg font-mono text-rose-500 px-4">Favorite Locations</h3>
            <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
                <li className="hover:bg-sky-400 hover:text-white text-center">Dhaka</li>
                <li className="hover:bg-gray-200">Rangpur</li>
                <li className="hover:bg-gray-200">Europe</li>
            </ul>
        </div>
    );
}
