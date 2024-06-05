/* eslint-disable react/prop-types */
import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
    const [fav, setFav] = useLocalStorage('weatherCity', []);

    const addToFav = (location) => {
        setFav((prevFav) => [...prevFav, location]);
    };

    const removeFav = (location) => {
        const restFav = fav.filter((f) => f !== location);
        setFav(restFav);
    };

    return (
        <FavoriteContext.Provider value={{ fav, addToFav, removeFav }}>
            {children}
        </FavoriteContext.Provider>
    );
}