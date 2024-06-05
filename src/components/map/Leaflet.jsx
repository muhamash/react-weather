/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';

function LeafletMap ( { lat, lon, rainData, weatherStep } )
{
    const { weatherData } = useFetch()
    const mapRef = useRef(null);
    const weatherLayerRef = useRef(null);

    useEffect(() => {
        const map = L.map('map').setView([lat, lon], 4);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const popupContent = `<div style="font-weight: thin; color: green;">
            Located 🥹😊😇 you in ${weatherData?.city}!
        </div>`;

        // const customIcon = L.icon( {
        //     iconUrl: markerIcon,
        //     iconSize: [ 20, 95 ], 
        //     iconAnchor: [ 22, 94 ], 
        //     popupAnchor: [ -3, -76 ]
        // } );

        L.marker([lat, lon],).addTo(map)
            .bindPopup(popupContent)
            .openPopup();

        return () => {
            map.remove();
        };
    }, [lat, lon]);

    useEffect(() => {
        if (rainData) {
            const weatherUrl = `${rainData.host}${rainData.radar.past[weatherStep].path}/512/{z}/{x}/{y}/6/1_0.png`;

            if (weatherLayerRef.current) {
                mapRef.current.removeLayer(weatherLayerRef.current);
            }

            weatherLayerRef.current = L.tileLayer(weatherUrl, { zIndex: 10 }).addTo(mapRef.current);
        }
    }, [rainData, weatherStep]);

    return (
        <div className="rounded-md" id="map" style={{ height: '200px', width: '320px' }}></div>
    );
}

export default React.memo(LeafletMap);