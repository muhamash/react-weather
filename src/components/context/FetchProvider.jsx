/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { retrieveData, reverseGeocode } from '../utils/helper';

export const FetchContext = createContext();


export function FetchProvider({ children }) {
  const [ location, setLocation ] = useState( "" );
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  

  const fetchLocation = useCallback( () =>
  {
    navigator.geolocation.getCurrentPosition(
      async ( position ) =>
      {
        const { latitude, longitude } = position.coords;
        const city = await reverseGeocode( latitude, longitude );
        setLocation( city );
        setCoords( { latitude, longitude } );
      },
      ( error ) =>
      {
        console.error( 'Failed to reverse geolocation', error );
      }
    );
  }, [] );

  useEffect( () =>
  {
    if ( !location )
    {
      fetchLocation();
    }
  }, [ location, fetchLocation ] );

  const setEndpoint = useCallback( ( endpoint ) =>
  {
    console.log( "Endpoint:", endpoint );
    setLocation( endpoint );
  }, [] );

  const { data, error, isLoading } = useQuery( {
    queryKey: [ 'weatherData', location ],
    queryFn: retrieveData,
    retry: 2,
    enabled: !!location,
  } );

  // const weatherData = data ? {
  //   city: data.resolvedAddress,
  //   temperature: temp(data.currentConditions.temp),
  //   maxTemperature: temp(data.days[0].tempmax),
  //   minTemperature: temp(data.days[0].tempmin),
  //   cloudPercentage: data.days[0].cloudcover,
  //   wind: data.days[0].windspeed,
  //   time: data.currentConditions?.datetimeEpoch,
  //   description: data.days[0].description,
  //   humidity: data.days[0].humidity,
  //   brief: data.description,
  //   icon: data.days[ 0 ].icon,
  //   lat: data.latitude,
  //   lon:data.longitude,
  // } : {};
  
  const weatherData = data ? {
    city: data.location.name,
    region:data.location.country,
    temperature: data.current.temp_c,
    maxTemperature: data.current.feelslike_c,
    minTemperature: data.current.dewpoint_c,
    cloudPercentage: data.current.cloud,
    wind: data.current.wind_kph,
    time: data.location.localtime_epoch,
    description: data.forecast.forecastday[0].day.condition.text,
    humidity: data.current.humidity,
    brief: data.current.condition.text,
    icon: data.current.condition.icon,
    climate: data.forecast.forecastday[ 0 ].day.condition.icon,
    lat: data.location.lat,
    lon:data.location.lon
  } : {};


  console.log(weatherData, error, isLoading);

  return (
    <FetchContext.Provider value={{ weatherData, error, isLoading, setEndpoint, coords, setCoords }}>
      {children}
    </FetchContext.Provider>
  );
}