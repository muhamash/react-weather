import { useCallback } from 'react';

function useDebounce(callback, delay) {
    const debounceCallback = useCallback( ( ...args ) =>
    {
        const handler = setTimeout( () =>
        {
            callback( ...args );
        }, delay );

        return () =>
        {
            clearTimeout( handler );
        };
    }, [ callback, delay ] );

    return debounceCallback;
}

export default useDebounce;