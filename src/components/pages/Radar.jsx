/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useRain } from '../hooks/useRain';
import LeafLetMap from '../map/Leaflet';

export default function Radar ( { lon, lat } )
{
  const { rain } = useRain();
  const [weatherData, setWeatherData] = React.useState(null);
  const [ weatherStep, setWeatherStep ] = React.useState( 0 );

  React.useEffect( () =>
  {
    setWeatherData( rain );
    if (weatherData && weatherData.radar && weatherData.radar.past) {
            const numSteps = weatherData.radar.past.length;
            const interval = setInterval(() => {
                setWeatherStep((prevStep) => (prevStep + 1) % numSteps);
            }, 1000);

            return () => clearInterval(interval);
        }
  }, [ rain, weatherData ] );

  console.log( lon, lat )
  
  return (
    <div className="p-[20px]">
      <div className="bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 min-h-[620px] max-w-[1600px] mx-auto">
        <LeafLetMap lat={ lat }
          lon={ lon }
          rainData={ weatherData }
          weatherStep={ weatherStep } />
      </div>
    </div>
  );
}
