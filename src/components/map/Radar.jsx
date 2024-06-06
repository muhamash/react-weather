/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as maptilersdk from '@maptiler/sdk';
import { RadarLayer } from "@maptiler/weather";
import { useEffect, useRef, useState } from 'react';

const MapComponent = ({lat, lon}) => {
    const mapContainer = useRef(null);
    const timeTextRef = useRef(null);
    const pointerDataRef = useRef(null);
    let pointerLngLat = null;

    const [map, setMap] = useState(null);
    const [weatherLayer, setWeatherLayer] = useState(null);

    useEffect(() => {
        maptilersdk.config.apiKey = 'YIfKfxlEousH33MgOlCt';

        const mapInstance = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.BACKDROP,
            zoom: 1,
            center: [lat, lon],
            hash: true,
        });

        setMap(mapInstance);

        const weatherLayerInstance = new RadarLayer({
            opacity: 0.8,
        });

        setWeatherLayer(weatherLayerInstance);

        weatherLayerInstance.on("tick", event => {
            refreshTime();
            updatePointerValue(event.pointerLngLat);
        });

        mapInstance.on('load', function () {
            mapInstance.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
            mapInstance.addLayer(weatherLayerInstance, 'Water');
            weatherLayerInstance.animateByFactor(3600);
        });

        mapInstance.on('mouseout', function (evt) {
            if (!evt.originalEvent.relatedTarget) {
                pointerDataRef.current.innerText = "";
                pointerLngLat = null;
            }
        });

        mapInstance.on('mousemove', (e) => {
            updatePointerValue(e.lngLat);
        });

        return () => {
            mapInstance.remove();
        };

    }, []);

    const refreshTime = () => {
        if (weatherLayer) {
            const d = weatherLayer.getAnimationTimeDate();
            timeTextRef.current.innerText = d.toString();
        }
    };

    const updatePointerValue = (lngLat) => {
        if (lngLat && weatherLayer) {
            pointerLngLat = lngLat;
            const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
            if (!value) {
                pointerDataRef.current.innerText = "";
                return;
            }
            pointerDataRef.current.innerText = `${value.value.toFixed(1)} dBZ`;
        }
    };

    return (
        <div>
            <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
            <div ref={timeTextRef}></div>
            <div ref={pointerDataRef}></div>
        </div>
    );
};

export default MapComponent;