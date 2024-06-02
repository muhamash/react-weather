/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const FetchContext = createContext();

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
      if ( response.status === 200 )
      {
          console.log(response.data)  
      return response.data;
    } else {
      throw new Error(`Something went wrong in retrieve function: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export function FetchProvider({ children }) {
  const [location, setLocation] = useState({ latitude: null, longitude: null, endpoint: "" });

  useEffect( () =>
  {
    if ( !location.endpoint )
    {
      navigator.geolocation.getCurrentPosition( ( position ) =>
      {
        setLocation( {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          endpoint: ""
        } );
      } );
    }
  }, [ location.endpoint ] );

  const setEndpoint = (endpoint) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      endpoint: endpoint
    }));
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['weatherData', { latitude: location.latitude, longitude: location.longitude, endpoint: location.endpoint }],
    queryFn: retrieveData,
    enabled: !!location.endpoint || (!!location.latitude && !!location.longitude),
  });

  const weatherData = data
    ?
    {
      location: data.address,
      city: data.resolvedAddress,
      temperature: data.days[ 0 ].temp,
      maxTemperature: data.days[ 0 ].tempmax,
      minTemperature: data.days[ 0 ].tempmin,
      cloudPercentage: data.days[ 0 ].cloudcover,
      wind: data.days[ 0 ].windspeed,
      time: data.days[ 0 ].datetime,
      description: data.days[ 0 ].description,
      humidity: data.days[ 0 ].humidity,
      brief: data.description,
      icon: data.days[ 0 ].icon,
      
    }
    :
    {};

  console.log(weatherData);

  return (
    <FetchContext.Provider value={{ weatherData, error, isLoading, setEndpoint }}>
      {children}
    </FetchContext.Provider>
  );
}