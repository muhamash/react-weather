/* eslint-disable no-useless-catch */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { PacmanLoader } from 'react-spinners';

const retrieveData = async ({ queryKey }) => {
  // const [ _key, { lat, lon } ] = queryKey;
  console.log(queryKey)
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${queryKey[1].lat}&lon=${queryKey[1].lon}&appid=265a11fb732e87f024759fc536aa97f6`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log("weather data response", response.data);
      return response.data;
    } else {
      throw new Error(`Something went wrong in retrieve function: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export default function ForeCast ( { lon, lat } )
{
  console.log(lat, lon)
  const { data, error, isLoading } = useQuery({
    queryKey: ['forecast', { lat, lon }],
    queryFn: retrieveData,
    retry: 2,
  });

  if (isLoading) {
    return <PacmanLoader size={ 120 } color="#3390c4" />;
  }

  if (error) {
    return <div className="text-md bg-red-700 text-white p-3 rounded shadow-yellow-200 bg-opacity-70 mix-blend-multiply drop-shadow-md shadow-lg">Error fetching forecast data: {error.message}</div>;
  }

  return (
    <div className="bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 p-[20px] min-h-[620px] max-w-[1058px] mx-auto my-5">
      <h2>Weather Forecast</h2>
    </div>
  );
}
