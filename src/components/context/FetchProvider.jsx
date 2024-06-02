/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { retrieveData, reverseGeocode, temp } from '../utils/helper';

export const FetchContext = createContext();


export function FetchProvider({ children }) {
  const [location, setLocation] = useState("");

  const fetchLocation = useCallback( () =>
  {
    navigator.geolocation.getCurrentPosition( async ( position ) =>
    {
      const city = await reverseGeocode( position.coords.latitude, position.coords.longitude );
      setLocation( city );
    },
      ( error ) =>
    {
      console.error( 'failed to reverse the geoLocation', error );
    } );
  }, [] );

  useEffect(() => {
    if (!location) {
      fetchLocation();
    }
  }, [location, fetchLocation]);

  const setEndpoint = useCallback( ( endpoint ) =>
  {
    console.log("Endpoint:", endpoint);
    setLocation(endpoint);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['weatherData', location],
    queryFn: retrieveData,
    retry: 2,
    enabled: !!location,
  });

  const weatherData = data ? {
    city: data.resolvedAddress,
    temperature: temp(data.currentConditions.temp),
    maxTemperature: temp(data.days[0].tempmax),
    minTemperature: temp(data.days[0].tempmin),
    cloudPercentage: data.days[0].cloudcover,
    wind: data.days[0].windspeed,
    time: data.currentConditions?.datetimeEpoch,
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