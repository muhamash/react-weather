import { useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useFetch } from '../hooks/useFetch';
import MapApp from './MapApp';

export default function LargeMap() {
    const { weatherData, error, isLoading } = useFetch();
    const [state, setState] = useState({ lat: null, lon: null });

    useEffect(() => {
        if (weatherData && weatherData.lat && weatherData.lon) {
            setState({ lat: weatherData.lat, lon: weatherData.lon });
        }
    }, [weatherData]);

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <PacmanLoader size={120} color="#3390c4" />
                </div>
            ) : error ? (
                <div>
                    <p>{error || "Component failed!"}</p>
                </div>
            ) : (
                <div className="h-screen w-screen">
                    {state.lat && state.lon && <MapApp lat={state.lat} lon={state.lon} />}
                </div>
            )}
        </div>
    );
}