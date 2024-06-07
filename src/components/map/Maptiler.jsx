/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { ColorRamp, PrecipitationLayer, PressureLayer, RadarLayer, TemperatureLayer, WindLayer } from "@maptiler/weather";
import React, { useEffect, useRef, useState } from 'react';
import './map.css';

export default function Map({ lon, lat, layer }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lonLat = { lng: lon, lat: lat };
    const [zoom] = useState(2);
    maptilersdk.config.apiKey = 'YIfKfxlEousH33MgOlCt';

    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [lonLat.lng, lonLat.lat],
            zoom: zoom
        });

        
        const weatherLayer = () =>
        {
            switch ( layer )
            {
                case "windLayer":
                    return new WindLayer( {
                        id: "Wind Particles",
                        colorramp:ColorRamp.builtin.NULL,
                        speed: 0.001,
                        fadeFactor: 0.03,
                        maxAmount: 256,
                        density: 200,
                        color: [ 10, 30, 60, 30 ],
                        fastColor: [ 0, 0, 0, 100 ],
                        opacity: 0.8
                    } );
                case "radarLayer":
                    return new RadarLayer( {
                        // opacity: 0.8,
                        // colorramp:ColorRamp.builtin.RADAR_CLOUD,
                    } );
                case "pressureLayer":
                    return new PressureLayer();
                case 'temperatureLayer':
                    return new TemperatureLayer( {
                        opacity:0.6
                    });
                case 'precipitationLayer':
                    return new PrecipitationLayer();
                default:
                    return null;
            }
        }

        const another = new RadarLayer( {
            opacity: 1,
            colorramp: ColorRamp.builtin.RADAR_CLOUD,
        } );
        map.current.on('load', function () {
            map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
            map.current.addLayer( weatherLayer(), 'Water' );
            // map.current.addLayer( another, 'Water' );
        });

        new maptilersdk.Marker({ color: "green" })
            .setLngLat([lonLat.lng, lonLat.lat])
            .addTo(map.current);
    }, [lonLat.lng, lonLat.lat]);

    return (
        <div>
            <div ref={mapContainer} className="map" />
        </div>
    );
}