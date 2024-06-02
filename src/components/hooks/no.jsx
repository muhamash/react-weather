import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const retrieveData = async ({ queryKey }) => {
  const [_, params] = queryKey;
  const { latitude, longitude, endpoint } = params;

  let url;
  if (endpoint) {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${endpoint}?key=4KCCBKNJQFYH8DKD2FMZQHBBT`;
  } else {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=4KCCBKNJQFYH8DKD2FMZQHBBT`;
  }

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Something went wrong in retrieve function: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

const reverseGeocode = async (latitude, longitude) => {
  const apiKey = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data.results.length > 0) {
      const { city, town, village } = response.data.results[0].components;
      return city || town || village || 'Unknown location';
    } else {
      throw new Error('Reverse geocoding failed');
    }
  } catch (error) {
    throw error;
  }
};

const useWeather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null, endpoint: '' });
  const [address, setAddress] = useState('');

  const fetchLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        endpoint: '',
      });
    });
  }, []);

  useEffect(() => {
    if (!location.endpoint && !location.latitude && !location.longitude) {
      fetchLocation();
    } else if (location.latitude && location.longitude) {
      reverseGeocode(location.latitude, location.longitude)
        .then((locationName) => {
          setAddress(locationName);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [ location.endpoint]);

  const setEndpoint = useCallback((endpoint) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      endpoint: endpoint,
    }));
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['weatherData', { latitude: location.latitude, longitude: location.longitude, endpoint: location.endpoint }],
    queryFn: retrieveData,
    enabled: !!location.endpoint || (!!location.latitude && !!location.longitude),
  });

  const weatherData = data
    ? {
        location: address || data.address,
        city: data.resolvedAddress || address,
        temperature: data.days[0].temp,
        maxTemperature: data.days[0].tempmax,
        minTemperature: data.days[0].tempmin,
        cloudPercentage: data.days[0].cloudcover,
        wind: data.days[0].windspeed,
        time: data.days[0].datetime,
      }
    : {};

  return { weatherData, error, isLoading, setEndpoint };
};

export default useWeather;