/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import LeafletMap from './Leaflet';

const getWeatherData = async (setWeatherData) => {
  try {
    const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");
    if (!response.ok) throw new Error('Network response was not ok');
    const json = await response.json();
    console.log('rainviewer', json)
    // setWeatherData(json);
  } catch (error) {
    console.error('Fetching weather data failed:', error);
    setWeatherData({});
  }
};

const MapApp = ( { lat, lon } ) =>
{
  console.log(lon, lat)
  const [weatherData, setWeatherData] = useState(null);
  // const [weatherStep, setWeatherStep] = useState(0);

  useEffect(() => {
    getWeatherData( weatherData);
    // console.log(weatherData.radar.past.length )
  }, []);

  // useEffect(() => {
  //   if (weatherData) {
  //     const numSteps = weatherData.radar.past.length;
  //     const interval = setInterval(() => {
  //       setWeatherStep((prevStep) => (prevStep + 1) % numSteps);
  //     }, 500);

  //     return () => clearInterval(interval);
  //   }
  // }, [weatherData]);

  return (
    <div>
      <LeafletMap
        lat={lat}
        lon={lon}
        // weatherData={weatherData}
        // weatherStep={weatherStep}
      />
    </div>
  );
};

export default MapApp;