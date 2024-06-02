import React from 'react';
import { FavoriteContext } from '../context/FavoriteProvider';

export function useFav() {
    const context = React.useContext(FavoriteContext);
    if (!context) {
        throw new Error('useFetch must be used within a FetchProvider');
    }
    return context;
}