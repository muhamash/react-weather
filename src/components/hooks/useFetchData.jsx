/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const retrieveData = async ( endpoint ) =>
{
    try
    {
        const response = await axios.get( `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${endpoint}?key=4KCCBKNJQFYH8DKD2FMZQHBBT` );
        if ( response.status === 200 )
        {
            console.log( response, response.data );
            return response.data;
        }
        else(error)
        {
            throw new Error(`something wrong on retrieve function ${error.message}`)
        }
    }
    catch ( error )
    {
        throw error;
    }
}

export default function useFetchQuery({
    queryKey = [],
    url = 'default-endpoint',
    staleTime = 3000,
    cacheTime = 2000,
    retry = 3,
    retryDelay = 1000,
    refetchOnWindowFocus = true,
    refetchInterval = false,
    onError = (error) => {
        console.error("Error occurred during data fetching:", error);
    },
    onSuccess = (data) => {
        console.log("Data fetched successfully:", data);
    },
    onSettled = (data, error) => {
        console.log("Data fetching settled:", { data, error });
    },
} ) 
{
    const { data, error, isLoading } = useQuery( {
        queryKey,
        queryFn: () => retrieveData( url ),
        // staleTime,
        // cacheTime,
        // retry,
        // retryDelay,
        // refetchOnWindowFocus,
        // refetchInterval,
    } );

    return { data, error, isLoading };
}
