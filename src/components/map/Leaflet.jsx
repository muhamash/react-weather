/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

function LeafletMap({lat, lon}) {
    useEffect( () =>
    {
        const map = L.map( 'map' ).setView( [ lat, lon ], 10 );

        L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        } ).addTo( map );

        L.marker( [ lat, lon ] ).addTo( map )
            .bindPopup( 'i am here' )
            .openPopup();

        // Clean up leaflet map when component unmounts
        return () =>
        {
            map.remove();
        };
    }, [ lat, lon ] );
    return (
        <div id="map" style={ { height: '200px' } }>
            
        </div>
    );
}

export default LeafletMap;