import 'leaflet/dist/leaflet.css';
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MapComponent = () => {
  const [weatherData, setWeatherData] = React.useState(null);
  
  const getWeatherData = async () => {
    try {
      const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  console.log(weatherData);

  return (
    <div onClick={ getWeatherData }>
      <MapContainer animate={ false } center={ [ 51.505, -0.09 ] } zoom={ 13 } style={ { height: '200px', width: 'fit' } }>
        <TileLayer
          maxNativeZoom={ 19 }
          maxZoom={ 19 }
          // subdomains={ [ "clarity" ] }
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={ [ 51.505, -0.09 ] }>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;