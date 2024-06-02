import React from 'react';

const useLocalStorage = (storageValue, storageKey) => {
    const getStoredValue = () => {
        try {
            const item = localStorage.getItem(storageKey);
            return item ? JSON.parse(item) : storageValue;
        } catch (error) {
            console.error("Error parsing JSON from localStorage", error);
            return storageValue;
        }
    };

    const [value, setValue] = React.useState(getStoredValue);

    React.useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting item in localStorage", error);
        }
    }, [value, storageKey]);

    return [value, setValue];
};

export default useLocalStorage;