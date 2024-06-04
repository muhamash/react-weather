/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// MapApp.jsx
import "leaflet/dist/leaflet.css";
import React from "react";
import MapComponent from "./MapComponent";

const getWeatherData = async ( setWeatherData ) =>
{
  const response = await fetch(
    "https://api.rainviewer.com/public/weather-maps.json"
  );

  console.log(response)
  if ( !response.ok )
  {
    return {};
  }

  const json = await response.json();
  setWeatherData( await json );
};

export default function MapApp ( { data } )
{
  // console.log(data.lon, data.lat)
  const [weatherData, setWeatherData] = React.useState(null);
  const [weatherStep, setWeatherStep] = React.useState(0);
  const [mapCenter, setMapCenter] = React.useState({ lat: data.lat, lng: data.lon });
  const [mouseCoords, setMouseCoords] = React.useState(null);

  React.useEffect(() => {
    
    getWeatherData( setWeatherData );
    console.log(mapCenter.lat, mapCenter.lng)
  }, []);

  React.useEffect(() => {
    if (weatherData !== null) {
      const numSteps = weatherData.radar.past.length;
      console.log( numSteps );

      const interval = setInterval(() => {
        setWeatherStep((prevStep) => (prevStep + 1) % numSteps);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [ weatherData ] );
  console.log( weatherData );

  return (
    <div>
      <div
        className="w-[200px] h-[200px]"
      >
        <div >
          <MapComponent
            weatherData={weatherData}
            weatherStep={weatherStep}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
            mouseCoords={mouseCoords}
            setMouseCoords={setMouseCoords}
          />
        </div>
      </div>
    </div>
  );
}