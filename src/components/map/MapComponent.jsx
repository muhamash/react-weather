/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import
  {
    MapContainer,
    TileLayer,
    useMapEvents
  } from "react-leaflet";

const MapEvents = ( props ) =>
{
  useMapEvents({
    mousemove: (event) => {
      props.setMouseCoords(event.latlng);
    },
    drag: (event) => {
      props.setMapCenter(event.target.getCenter());
    },
  });
  return null;
};

const MapComponent = ( props ) =>
{
    console.log(props.weatherData );
  return (
    <MapContainer
      animate={false}
      center={props.mapCenter}
      style={{ height: "100%", width: "100%" }}
      zoom={5}
    >
      <MapEvents
        setMouseCoords={props.setMouseCoords}
        setMapCenter={props.setMapCenter}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.weatherData !== null && (
        <TileLayer
          key={`weather-data-${props.weatherData.radar.past[props.weatherStep].time}`}
          url={`${props.weatherData.host}${props.weatherData.radar.past[props.weatherStep].path}/512/{z}/{x}/{y}/6/1_0.png`}
          zIndex={10}
        />
      )}
    </MapContainer>
  );
};

export default React.memo(MapComponent);