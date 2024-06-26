/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import confetti from "https://esm.sh/canvas-confetti@1.6.0"
// import React from "https://esm.sh/react@18.2.0"

// const Map = () => {
//   function onMouseMove(e) {
//     confetti({
//       particleCount: 5,
//       origin: {
//         x: e.pageX / window.innerWidth,
//         y: (e.pageY + 20) / window.innerHeight,
//       }
//     })
//   }

//   return (
//     <div onMouseMove={onMouseMove} className="h-screen w-screen">
//       <h1>Hello React! ⚛️</h1>
//       <p>Building user interfaces.</p>
//     </div>
//   )
// }

// export default Map

import axios from 'axios';
import React from "https://esm.sh/react@18.2.0";
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';


function MapEvents({ setState }) {
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setState(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        }
    });

    return null;
}

export default function Map() {
    const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
    const [ popupContent, setPopupContent ] = useState( null );
    

    const handleMarkerDragEnd = (e) => {
        setMarkerPosition( e.target.getLatLng() );
        
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${e.target.getLatLng().lat}&lon=${e.target.getLatLng().lng}&format=json`)
            .then( response =>
            {
                console.log(response.data)
                const cityName = response.data.display_name;
                setPopupContent(cityName);
            })
            .catch(error => {
                console.error('Error fetching city name:', error);
            });
    };



    return (
        <div className="p-[20px]">
            <div className="p-[2px] my-5 bg-black/20 rounded-xl backdrop-blur-md border-[1.2px] border-sky-500 min-h-[520px] max-w-[1600px] mx-auto" >
            <MapContainer center={ markerPosition } zoom={ 10 } style={ { height: '620px', width: '100%' } }>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={ markerPosition } draggable={ true } eventHandlers={ { dragend: handleMarkerDragEnd } }>
                    <Popup>{ popupContent || 'Drag me to see city name' }</Popup>
                </Marker>
                <MapEvents setState={ setMarkerPosition } />
            </MapContainer>
        </div>
        </div>
    );
}