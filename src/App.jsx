import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { FetchProvider } from './components/context/FetchProvider';
import { RainProvider } from './components/context/RainProvider';
import { useFetch } from './components/hooks/useFetch.jsx';
import LargeMap from './components/map/LargeMap';
import DashBoard from './components/pages/DashBoard';
import Radar from './components/pages/Radar';
import Root from './components/Root';

export default function App() {
  const location = useLocation();
  const { weatherData, error, isLoading } = useFetch();
  return (
    <React.Suspense fallback={ <p>loading.....</p> }>
      <Routes location={ location } key={ location.key }>
        <Route path="/"
          element={
            <Root/>
          } exact>
          <Route path={ "radar" } element={ <Radar lon={ weatherData.lon} lat={weatherData.lat} /> } />
          <Route path={ "dashboard" } element={<DashBoard  weatherData={weatherData} error={error} isLoading={isLoading}/>} />
        </Route>
        <Route
          path="/map"
          element={
          <FetchProvider>
            <RainProvider>
              <LargeMap />
            </RainProvider>
          </FetchProvider>
        }>
          
        </Route>
        {/* <Route path="/map" element={ <MapApp/> } /> */ }
      </Routes>
    </React.Suspense>
  );
}