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
    // const lonLat = { lng: lon, lat: lat };
    const [zoom] = useState(2);
    maptilersdk.config.apiKey = 'YIfKfxlEousH33MgOlCt';

    console.log(lon, lat, layer)

    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [lon, lat],
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
                        opacity: 0.9
                    } );
                case "radarLayer":
                    return new RadarLayer( {
                        opacity: 0.8,
                        colorramp:ColorRamp.builtin.RADAR_CLOUD,
                    } );
                case "pressureLayer":
                    return new PressureLayer();
                case 'temperatureLayer':
                    return new TemperatureLayer( {
                        opacity:0.6
                    });
                case 'precipitationLayer':
                    return new PrecipitationLayer( {
                        // opacity: [ 0.9 ],
                        // fastColor: [ 0, 0, 0, 100 ],
                    });
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
        } );
        
        map.current.on( 'click', function ( e )
        {
            console.log( 'A click event has occurred at ' + e.lngLat );
        } );

        new maptilersdk.Marker({ color: "green", draggable: true ,rotation: 1})
            .setLngLat( [ lat, lon ] )
             .setPopup(new maptilersdk.Popup().setHTML("jbjkbjkbjk"))
            .addTo(map.current);
    }, [lon, lat]);

    return (
        <div className="p-5">
            <div style={ { minHeight: '620px', maxWidth: '1600px' } } ref={ mapContainer }
                className="map rounded-md z-1">
                <div className="z-10 absolute  p-2 bg-black/30 backdrop-blur-md m-5 rounded-md text-white text-md font-mono">
                    <div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={ 'weather' } />
                            <label htmlFor="">wind</label>
                        </div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={ 'weather' } />
                            <label htmlFor="">temperature</label>
                        </div>
                        <div className="flex gap-1 items-center py-1">
                            <input type="checkbox" value={ 'weather' } />
                            <label htmlFor="">pressure</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}