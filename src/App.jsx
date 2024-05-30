// import React from 'react'

import { WeatherProvider } from "./components/context/useWeatherProvider";
import Root from "./components/Root";

const queryOptions = {
  queryKey: [ 'weatherData' ],
  url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=4KCCBKNJQFYH8DKD2FMZQHBBT',
};

export default function App ()
{
  return (
    <div>
      <WeatherProvider queryUrl={queryOptions}>
        <Root/>
      </WeatherProvider>
    </div>
  )
}
