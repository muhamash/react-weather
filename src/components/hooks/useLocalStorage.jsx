import React from 'react';

const useLocalStorage = (storageKey, storageValue) => {
    const getStoredValue = () => {
        try {
            const item = localStorage.getItem( storageKey );
            console.log(item)
            return item ? JSON.parse(item) : storageValue;
        } catch (error) {
            console.error("Error parsing JSON from localStorage", error);
            return storageValue;
        }
    };

    const [value, setValue] = React.useState(() => getStoredValue());

    React.useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting item in localStorage", error);
        }
    }, [value, storageKey]);

    console.log(storageKey, value)
    return [value, setValue];
};

export default useLocalStorage;