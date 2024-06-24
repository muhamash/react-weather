/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRain } from '../hooks/useRain';
import LeafletMap from './Leaflet';


const MapApp = ({ lat, lon }) => {
    const { rain } = useRain();
    const [weatherData, setWeatherData] = useState(null);
    const [weatherStep, setWeatherStep] = useState(0);

    useEffect(() => {
        setWeatherData(rain);
    }, [rain]);

    useEffect(() => {
        if (weatherData && weatherData.radar && weatherData.radar.past) {
            const numSteps = weatherData.radar.past.length;
            const interval = setInterval(() => {
                setWeatherStep((prevStep) => (prevStep + 1) % numSteps);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [weatherData]);

    return (
        <div className="w-full h-full">
            {weatherData && (
                <LeafletMap
                    lat={lat}
                    lon={lon}
                    rainData={weatherData}
                    weatherStep={weatherStep}
                />
            )}
        </div>
    );
};

export default MapApp;