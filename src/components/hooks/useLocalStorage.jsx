import React from 'react';

const useLocalStorage = (storageValue, storageKey) =>
{
    const [ value, setValue ] = React.useState(
        JSON.parse( localStorage.getItem( storageKey ) ) ?? storageValue
    );

    console.log( value, storageKey, storageValue );

    React.useEffect( () =>
    {
        localStorage.getItem( storageKey, JSON.parse( storageKey ) );
    }, [ value, storageKey ] );

    return [ value, setValue ];
}

export default useLocalStorage;