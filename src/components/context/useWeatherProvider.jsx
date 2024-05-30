/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import useFetchQuery from '../hooks/useFetchData';

const DataWeather = React.createContext();

const WeatherProvider = ({children, queryUrl})=> {
    const query = useFetchQuery(queryUrl);

    return (
        <DataWeather.Provider value={query}>
            {children}
        </DataWeather.Provider>
    );
}

const useWeatherContext = () => {
    const context = React.useContext(DataWeather);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

export { WeatherProvider, useWeatherContext };
