/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';

const retrieveData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.days[0];
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (err) {
        console.log(err)
    }
};

const useFetchQuery = ({
    queryKey = [],
    url = '',
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