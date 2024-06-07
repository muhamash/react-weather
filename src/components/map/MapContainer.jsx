/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Map from './Maptiler';

export default function MapContainer({ name }) {
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect( () =>
  {
    const getLocation = async () =>
    {
      if ( navigator.geolocation )
      {
        navigator.geolocation.getCurrentPosition(
          ( position ) =>
          {
            setLocation( {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            } );
          },
          ( error ) =>
          {
            alert( "Please allow permission to access your location!" );
          }
        );
      }
    };

    getLocation();
  }, [] );

  return (
    <div className="bg-slate-400 mx-auto rounded-md flex w-full flex-wrap p-1 bg-opacity-60  drop-shadow-md backdrop-blur-md hover:shadow-lg">
      <div className="bg-green-600 w-full">
        {name}
      </div>
      <div className="w-full h-[300px]">
        {location.lat && location.lon ? (
          <Map lat={location.lat} lon={location.lat} layer={name}/>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
    </div>
  );
}