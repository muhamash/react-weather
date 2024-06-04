/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';

function LeafletMap({ lat, lon, weatherData, weatherStep }) {
    const mapRef = useRef(null);
    const weatherLayerRef = useRef(null);

    useEffect(() => {
        const map = L.map('map').setView([lat, lon], 5);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
            .bindPopup('I am here!')
            .openPopup();

        return () => {
            map.remove();
        };
    }, [lat, lon]);

    useEffect(() => {
        if (weatherData) {
            const weatherUrl = `${weatherData.host}${weatherData.radar.past[weatherStep].path}/512/{z}/{x}/{y}/6/1_0.png`;

            if (weatherLayerRef.current) {
                mapRef.current.removeLayer(weatherLayerRef.current);
            }

            weatherLayerRef.current = L.tileLayer(weatherUrl, { zIndex: 10 }).addTo(mapRef.current);
        }
    }, [weatherData, weatherStep]);

    return (
        <div className="rounded-md" id="map" style={{ height: '300px' }}></div>
    );
}

export default React.memo(LeafletMap);