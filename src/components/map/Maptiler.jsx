/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
// import { TemperatureLayer } from "@maptiler/weather";
// import { RadarLayer } from "@maptiler/weather";
// import { PrecipitationLayer } from "@maptiler/weather";
// import { PressureLayer } from "@maptiler/weather";
import { WindLayer } from "@maptiler/weather";
import React, { useEffect, useRef, useState } from 'react';
import './map.css';

export default function Map({ lon, lat }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lonLat = { lng: lon, lat: lat };
    const [zoom] = useState(5);
    maptilersdk.config.apiKey = 'YIfKfxlEousH33MgOlCt';

    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREET,
            center: [lonLat.lng, lonLat.lat],
            zoom: zoom
        });

        const weatherLayer = new WindLayer();

        map.current.on('load', function () {
            map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
            map.current.addLayer(weatherLayer, 'Water');
        });

        new maptilersdk.Marker({ color: "green" })
            .setLngLat([lonLat.lng, lonLat.lat])
            .addTo(map.current);
    }, [lonLat.lng, lonLat.lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}