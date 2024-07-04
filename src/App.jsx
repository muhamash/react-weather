import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useFetch } from './components/hooks/useFetch.jsx';
import DashBoard from './components/pages/DashBoard';
import Map from './components/pages/Map.jsx';
import Radar from './components/pages/Radar';
import Root from './components/Root';
import ForeCast from './components/pages/ForeCast.jsx';

export default function App() {
  const location = useLocation();
  const { weatherData, error, isLoading } = useFetch();
  return (
    <React.Suspense fallback={<p>loading.....</p>}>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Root />}>
          <Route index element={<DashBoard weatherData={weatherData} error={error} isLoading={isLoading} />} />
          <Route path="radar" element={<Radar lon={weatherData.lon} lat={weatherData.lat} />} />
          <Route path="map" element={ <Map lon={ weatherData.lon } lat={ weatherData.lat } /> } />
          <Route path="forecast" element={ <ForeCast />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}