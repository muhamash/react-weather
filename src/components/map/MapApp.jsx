/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRain } from '../hooks/useRain';
import LeafletMap from './Leaflet';

// const getWeatherData = async (setWeatherData) => {
//   try {
//     const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");
//     if (!response.ok) throw new Error('Network response was not ok');
//     const json = await response.json();
//     console.log('rainviewer', json)
//     // setWeatherData(json);
//   } catch (error) {
//     console.error('Fetching weather data failed:', error);
//     setWeatherData({});
//   }
// };

const MapApp = ( { lat, lon } ) =>
{
  console.log( lon, lat )
  const {rain} = useRain()
  const [weatherData, setWeatherData] = useState(null);
  const [weatherStep, setWeatherStep] = useState(0);

  console.log(rain.radar.past)
  useEffect( () =>
  {
    
    setWeatherData( rain );
    // console.log(weatherData.radar.past.length )
  }, [] );
  // console.log(weatherData)

  useEffect( () =>
  {
    if ( weatherData )
    {
      const numSteps = weatherData.radar.past.length;
      const interval = setInterval( () =>
      {
        setWeatherStep( ( prevStep ) => ( prevStep + 1 ) % numSteps );
      }, 1000 );
      
      // console.log('interval',interval)
      return () => clearInterval( interval );
    }
  }, [ weatherData ] );

  return (
    <div className="w-[300px] h-[200px]">
      <LeafletMap
        lat={lat}
        lon={lon}
        rainData={weatherData}
        weatherStep={weatherStep}
      />
    </div>
  );
};

export default MapApp;