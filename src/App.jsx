import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { FavoriteProvider } from './components/context/FavoriteProvider';
import { FetchProvider } from './components/context/FetchProvider';
import { RainProvider } from './components/context/RainProvider';
import LargeMap from './components/map/LargeMap';
import Root from './components/Root';

export default function App() {
  const location = useLocation();
  
  return (
    <React.Suspense fallback={ <p>loading.....</p> }>
      <Routes location={ location } key={ location.key }>
        <Route
          path="/"
          element={
            <FetchProvider>
              <FavoriteProvider>
                <RainProvider>
                  <Root />
                </RainProvider>
              </FavoriteProvider>
            </FetchProvider>
          }
        />
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