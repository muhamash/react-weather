/* eslint-disable react-hooks/exhaustive-deps */
import L from 'leaflet';
import { useEffect } from 'react';

const useLeafletMap = (lat, lon) => {
    // const mapRef = useRef(null);

    useEffect( () =>
    {
        const map = L.map( 'map' ).setView( [ lat, lon ], 10 );

        L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        } ).addTo( map );

        L.marker( [ lat, lon ] ).addTo( map )
            .bindPopup( 'i am here' )
            .openPopup();

        return () =>
        {
            map.remove();
        };
    }, [lat, lon] );

};

    export default useLeafletMap;