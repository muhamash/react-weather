/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useCallback, useState } from 'react';


export const FetchContext = createContext();

const retrieveData = async (endpoint) => {
    try {
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${endpoint}?key=4KCCBKNJQFYH8DKD2FMZQHBBT`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Something went wrong in retrieve function: ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
};

export function FetchProvider({ children }) {
    const [queryKey, setQueryKey] = useState(['default']);
    const [url, setUrl] = useState('thakurgaon');
    // const [isFetching, setIsFetching] = useState(false);

    const setEndpoint = useCallback( ( newQueryKey, newUrl ) =>
    {
        setQueryKey( newQueryKey );
        setUrl( newUrl );
    }, [] );

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => {
            // setIsFetching(true);
            const data = await retrieveData(url);
            // setIsFetching(false);
            return data;
        },
        staleTime: 3000,
        cacheTime: 2000,
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: true,
    });


    return (
        <FetchContext.Provider value={{ data, error, isLoading,  setEndpoint }}>
            {children}
        </FetchContext.Provider>
    );
}

