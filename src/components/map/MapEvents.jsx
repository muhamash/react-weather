/* eslint-disable react/prop-types */
import { useMapEvents } from 'react-leaflet';

const MapEvents = ({ setMouseCoords, setMapCenter }) => {
  useMapEvents({
    mousemove: (event) => {
      setMouseCoords(event.latlng);
    },
    drag: (event) => {
      setMapCenter(event.target.getCenter());
    },
  });
  return null;
};

export default MapEvents;
