/* eslint-disable no-undef */
// import React from 'react';

export default function AddFav ()
{
    return (
        <div className="md:col-span-2">
            <div className="flex items-center justify-end space-x-6">
                <button onClick={()=>console.log('fav')} className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D] cursor-pointer hover:bg-green-500 hover:text-white shadow-md">
                    <span>Add to Favorite</span>
                    {/* <img src={ onClick ? HeartIcon : HeartIconRed } alt="" /> */}
                </button>
								
            </div>
        </div>
    );
}
