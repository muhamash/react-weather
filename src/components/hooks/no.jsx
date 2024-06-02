import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

export const FetchContext = createContext();

const retrieveData = async (city) => {
  const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  const apiKey = '4KCCBKNJQFYH8DKD2FMZQHBBT';
  const url = `${baseUrl}${city}?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log("weather data response", response);
      return response.data;
    } else {
      throw new Error(`Something went wrong in retrieve function: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

const reverseGeocode = async (latitude, longitude) => {
  const apiKey = '80c5c52c4b00481bb5e049bc1be477de';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log("reverse geo location", response.data.results[0].components);
      const { city } = response.data.results[0].components;
      console.log(city);
      return city;
    } else {
      throw new Error('Reverse geocoding failed');
    }
  } catch (error) {
    throw error;
  }
};

export function FetchProvider({ children }) {
  const [location, setLocation] = useState("");

  const fetchLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const city = await reverseGeocode(position.coords.latitude, position.coords.longitude);
      setLocation(city);
    }, (error) => {
      console.error('Error fetching location', error);
    });
  }, []);

  useEffect(() => {
    if (!location) {
      fetchLocation();
    }
  }, [location, fetchLocation]);

  const setEndpoint = useCallback((endpoint) => {
    setLocation(endpoint);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['weatherData', location],
    queryFn: retrieveData,
    enabled: !!location,
  });

  const weatherData = data ? {
    city: data.resolvedAddress,
    temperature: data.days[0].temp,
    maxTemperature: data.days[0].tempmax,
    minTemperature: data.days[0].tempmin,
    cloudPercentage: data.days[0].cloudcover,
    wind: data.days[0].windspeed,
    time: data.days[0].datetime,
    description: data.days[0].description,
    humidity: data.days[0].humidity,
    brief: data.description,
    icon: data.days[0].icon,
  } : {};

  console.log(weatherData, error, isLoading);

  return (
    <FetchContext.Provider value={{ weatherData, error, isLoading, setEndpoint }}>
      {children}
    </FetchContext.Provider>
  );
}