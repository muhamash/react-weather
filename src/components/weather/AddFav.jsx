/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React from 'react';
import HeartIcon from '../../assets/heart-red.svg';
import HeartIconRed from '../../assets/heart.svg';
import { useFav } from "../hooks/useFav";
import { useFetch } from "../hooks/useFetch";

export default function AddFav() {
    const { addToFav, removeFav, fav } = useFav();

    const { weatherData } = useFetch();
    console.log(weatherData)

    const [toggle, setToggle] = React.useState(false);

    console.log(fav );

    React.useEffect( () =>
    {
        if ( fav && weatherData?.city )
        {
            const result = fav.find( f => f == weatherData.city );
            console.log( result, fav )
            setToggle( result );
        }
    }, [fav, weatherData.city] );

    const handleClick = () =>
    {
        const result = fav.find( f => f == weatherData.city );
        if (!result) {
            addToFav(weatherData.city);
        } else {
            removeFav(weatherData.city);
        }
        setToggle(!toggle);
    };

    return (
        <div className="md:col-span-2">
            <div className="flex items-center justify-end space-x-6">
                <button 
                    onClick={handleClick}
                    className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D] cursor-pointer hover:bg-green-500 hover:text-white shadow-md"
                >
                    <span>{toggle ? "Remove from Favorite" : "Add Favorite"}</span>
                    <img src={!toggle ? HeartIconRed : HeartIcon} alt="" />
                </button>
            </div>
        </div>
    );
}
