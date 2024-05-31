/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useCallback, useState } from 'react';

export const FetchContext = createContext();

const retrieveData = async ( endpoint ) =>
{
    try
    {
        const response = await axios.get( `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${endpoint}?key=4KCCBKNJQFYH8DKD2FMZQHBBT` );
        if ( response.status === 200 )
        {
            console.log(response.data)
            return response.data;
        } else
        {
            throw new Error( `something wrong on retrieve function ${response.statusText}` );
        }
    } catch ( error )
    {
        throw error;
    }
};

export function FetchProvider({ children }) {
    const [queryKey, setQueryKey] = useState([]);
    const [url, setUrl] = useState('thakurgaon');
    const [ options, setOptions ] = useState( {
        staleTime: 3000,
        cacheTime: 2000,
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: true,
        refetchInterval: false,
        onError: ( error ) => console.error( "Error occurred during data fetching:", error ),
        onSuccess: ( data ) => console.log( "Data fetched successfully:", data ),
        onSettled: ( data, error ) => console.log( "Data fetching settled:", { data, error } ),
    } );

    const setEndpoint = useCallback( ( newQueryKey, newUrl, newOptions = {} ) =>
    {
        setQueryKey( newQueryKey );
        setUrl( newUrl );
        setOptions( ( prevOptions ) => ( { ...prevOptions, ...newOptions } ) );
    }, [] );

    const { data, error, isLoading } = useQuery( {
        queryKey,
        queryFn: () => retrieveData( url ),
        ...options,
    } );

    return (
        <FetchContext.Provider value={ { data, error, isLoading, setEndpoint } }>
            { children }
        </FetchContext.Provider>
    );
}