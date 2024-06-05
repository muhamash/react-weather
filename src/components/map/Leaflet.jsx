/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';

function LeafletMap({ lat, lon, rainData, weatherStep }) {
    const { weatherData } = useFetch();
    const mapRef = useRef(null);
    const weatherLayerRef = useRef(null);
    const city = weatherData?.city?.split(',') || [];

    useEffect(() => {
        if (!lat || !lon) {
            console.error('Latitude or longitude is not defined');
            return;
        }

        const map = L.map('map').setView([lat, lon], 3);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (city.length > 0) {
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`Located 🥹😇 you in ${city[0]}!`)
                .openPopup();
        } else {
            console.warn('City data is not available');
        }

        return () => {
            map.remove();
        };
    }, [lat, lon]);

    useEffect(() => {
        if (rainData && rainData.radar && rainData.radar.past) {
            const weatherUrl = `${rainData.host}${rainData.radar.past[weatherStep].path}/512/{z}/{x}/{y}/6/1_0.png`;

            if (weatherLayerRef.current) {
                mapRef.current.removeLayer(weatherLayerRef.current);
            }

            weatherLayerRef.current = L.tileLayer(weatherUrl, { zIndex: 10 }).addTo(mapRef.current);
        } else {
            console.warn('Rain data is not complete or not available');
        }
    }, [rainData, weatherStep]);

    return (
        <div className="rounded-md" id="map" style={{ height: '200px', width: '300px' }}></div>
    );
}

export default React.memo(LeafletMap);