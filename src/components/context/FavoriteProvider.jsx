/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const FavoriteContext = createContext();


export default function FavoriteProvider ({children})
{
    const [ fav, setFav ] = useLocalStorage( 'favorite', [] );

    const AddToFav = ( location ) =>
    {
        setFav( [ ...fav, location ] )
    };

    const removeFav = (location) =>
    {
        const restFav = fav.filter( ( f ) =>
        {
            f.location !== location
        } );
        setFav( restFav );
    }

    return (
        <FavoriteContext.Provider value = {fav, AddToFav, removeFav}>
            {children}
        </FavoriteContext.Provider>
    );
}
