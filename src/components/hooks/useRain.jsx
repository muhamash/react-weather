import React from 'react';
import { Rain } from '../context/RainProvider';

export function useRain() {
    const context = React.useContext(Rain);
    if (!context) {
        throw new Error('must be used within a FetchProvider');
    }
    return context;
}