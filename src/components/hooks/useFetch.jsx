import React from 'react';
import { FetchContext } from '../context/FetchProvider';

export function useFetch() {
    const context = React.useContext(FetchContext);
    if (!context) {
        throw new Error('useFetch must be used within a FetchProvider');
    }
    return context;
}