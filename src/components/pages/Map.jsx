/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { ColorRamp, PrecipitationLayer, PressureLayer, RadarLayer, TemperatureLayer, WindLayer } from "@maptiler/weather";
import React, { useEffect, useRef, useState } from 'react';
import './map.css';

export default function Map({ lon, lat, layer }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(2);
    const [activeLayers, setActiveLayers] = useState({});
    maptilersdk.config.apiKey = 'YIfKfxlEousH33MgOlCt';

    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [lon, lat],
            zoom: zoom
        });

        map.current.on('load', function () {
            map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
        });

        map.current.on('click', async function (e) {
            const { lngLat } = e;
            const data = await getLayerData(lngLat);
            new maptilersdk.Popup()
                .setLngLat(lngLat)
                .setHTML(data)
                .addTo(map.current);
        });

        new maptilersdk.Marker({ color: "green", draggable: true, rotation: 1 })
            .setLngLat([lon, lat])
            .setPopup(new maptilersdk.Popup().setHTML("You are here!"))
            .addTo(map.current);
    }, []);

    useEffect(() => {
        if (!map.current) return;

        Object.keys(activeLayers).forEach(layerKey => {
            const layer = map.current.getLayer(layerKey);
            if (activeLayers[layerKey] && !layer) {
                const weatherLayer = createWeatherLayer(layerKey);
                map.current.addLayer(weatherLayer, 'Water');
            } else if (!activeLayers[layerKey] && layer) {
                map.current.removeLayer(layerKey);
            }
        });
    }, [activeLayers]);

    const createWeatherLayer = (layerType) => {
        switch (layerType) {
            case "windLayer":
                return new WindLayer({
                    id: "windLayer",
                    colorramp: ColorRamp.builtin.NULL,
                    speed: 0.001,
                    fadeFactor: 0.03,
                    maxAmount: 256,
                    density: 200,
                    color: [20, 30, 60, 50],
                    fastColor: [0, 0, 0, 100],
                    opacity: 0.9
                });
            case "radarLayer":
                return new RadarLayer({
                    id: "radarLayer",
                    opacity: 0.5,
                });
            case "pressureLayer":
                return new PressureLayer({ id: "pressureLayer", opacity: 0.5 });
            case 'temperatureLayer':
                return new TemperatureLayer({
                    id: "temperatureLayer",
                    opacity: 0.4,
                    colorramp: ColorRamp.builtin.TEMPERATURE
                });
            case 'precipitationLayer':
                return new PrecipitationLayer({
                    id: "precipitationLayer",
                    opacity: 0.8,
                    colorramp: ColorRamp.builtin.PRECIPITATION
                });
            default:
                return null;
        }
    };

    const fetchLocationDetails = async (lngLat) => {
        const response = await fetch(
            `https://api.maptiler.com/geocoding/${lngLat.lng},${lngLat.lat}.json?key=YIfKfxlEousH33MgOlCt`
        );
        const data = await response.json();

        return data.features.length > 0 ? data.features[0].place_name : 'Unknown location';
    };

    const getLayerData = async (lngLat) => {
        let data = '';
        const datas = await fetchLocationDetails(lngLat);
         data += `<p> ${datas}</p>`;
        return data || 'No data available';
    }

    const handleCheckBox = (event) => {
        const { value, checked } = event.target;
        setActiveLayers(prevState => ({
            ...prevState,
            [value]: checked
        }));
    }

    return (
        <div className="p-5">
            <div style={{ minHeight: '620px', maxWidth: '1600px' }} ref={mapContainer}
                className="map rounded-md z-1 mx-auto">
                <div className="z-10 absolute p-2 bg-black/30 backdrop-blur-md m-5 rounded-md text-white text-md font-mono">
                    <div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={'windLayer'} onClick={handleCheckBox} />
                            <label htmlFor="">wind</label>
                        </div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={'temperatureLayer'} onClick={handleCheckBox} />
                            <label htmlFor="">temperature</label>
                        </div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={'pressureLayer'} onClick={handleCheckBox} />
                            <label htmlFor="">pressure</label>
                        </div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={'precipitationLayer'} onClick={handleCheckBox} />
                            <label htmlFor="">precipitation</label>
                        </div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={'radarLayer'} onClick={handleCheckBox} />
                            <label htmlFor="">radar</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}