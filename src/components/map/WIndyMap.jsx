/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

function WindyMap({lat, lon}) {
  const [ state, setSate ] = useState( { lat: lat, lon: lon } );
  
  // const

  useEffect(() => {

    const iframe = document.getElementById('windyMap');
    if (iframe) {
      iframe.src = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=${state.lat}&lon=${state.lon}`;
    }
  }, [state.lat, state.lon]);

  return (
    <div >
      <iframe
        className="rounded-md"
        id="windyMap"
        width="300"
        height="200"
        src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${lon}`}
        frameBorder="0"
        title="Windy Map"
      ></iframe>
    </div>
  );
}

export default React.memo(WindyMap);