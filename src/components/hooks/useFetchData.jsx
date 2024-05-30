/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const retrieveData = async ( url ) =>
{
    try
    {
        const response = await axios.get( url );
        if ( !response.ok )
        {
            console.log( response )
            return response.data;
        }
    }
    catch ( err )
    {
        throw err
    }
};

const useFetchQuery = ({
    queryKey = [],
    url = url,
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
}) => {
    return useQuery({
        queryKey,
        queryFn: () => retrieveData(url),
        staleTime,
        cacheTime,
        retry,
        retryDelay,
        refetchOnWindowFocus,
        refetchInterval,
        onError,
        onSuccess,
        onSettled,
    });
};

export default useFetchQuery;