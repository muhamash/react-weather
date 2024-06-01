/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { LocationContext } from '../context';

const fetchWeatherData = async ({ queryKey }) => {
  const [_, params] = queryKey;
  const { latitude, longitude, city } = params;

  let url;
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetching weather data failed: ${response.status}`);
  }
  return response.json();
};

const useWeatherQuery = (city = '') => {
  const { selectedLocation } = useContext(LocationContext);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (!city && selectedLocation.latitude && selectedLocation.longitude) {
      setLocation(selectedLocation);
    } else if (!city) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [selectedLocation, city]);

  const { data, error, isLoading } = useQuery(
    ['weatherData', { latitude: location.latitude, longitude: location.longitude, city }],
    fetchWeatherData,
    {
      enabled: city || (location.latitude && location.longitude), // Only fetch when we have a city or location
    }
  );

  const weatherData = data
    ? {
        location: data.name,
        climate: data.weather[0].main,
        temperature: data.main.temp,
        maxTemperature: data.main.temp_max,
        minTemperature: data.main.temp_min,
        humidity: data.main.humidity,
        cloudPercentage: data.clouds.all,
        wind: data.wind.speed,
        time: data.dt,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
      }
    : {};

  return { weatherData, error, isLoading };
};

export default useWeatherQuery;