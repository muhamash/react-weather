/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

export const  Rain = createContext();

const getRain = async (setRain) => {
  try {
    const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");
    if (!response.ok) throw new Error('Network response was not ok');
    const json = await response.json();
    setRain(json);
  } catch (error) {
    console.error('Fetching weather data failed:', error);
    setRain({});
  }
};

export function RainProvider({ children }) {
  const [rain, setRain] = useState(null);

  useEffect(() => {
    getRain(setRain);
  }, []);

  return (
    <Rain.Provider value={{ rain }}>
      {children}
    </Rain.Provider>
  );
}
