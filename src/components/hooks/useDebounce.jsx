/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const useDebounce = ( callback, delay ) =>
{
    const timeoutRef = React.useRef( null );

    React.useEffect( () =>
    {
        return () =>
        {
            if ( timeoutRef.current )
            {
                clearTimeout( timeoutRef );
            }
        }
    }, [] );

    const debounceCallback = ( ...args ) =>
    {
        if ( timeoutRef.current )
            {
                clearTimeout( timeoutRef );
        }
        
        console.log( timeoutRef, args, callback, delay )
        
        timeoutRef.current = setTimeout( () =>
        {
            callback( ...args )
        }, delay );
    }

    return debounceCallback;
}

export default useDebounce;