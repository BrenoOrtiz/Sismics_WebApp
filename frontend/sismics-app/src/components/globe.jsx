"use client"

import "./globe.css"

import { useEffect, useRef, useState } from 'react';

export default function GlobeComponent({ seismicEvents, pointsData }) { 

    const globeEl = useRef();
    const [GlobeModule, setGlobeModule] = useState(null);

    useEffect(() => {
        import('globe.gl').then(module => {
            setGlobeModule(() => module.default); 
        });
    }, []); 

    // Inicializar o GLOBO
    useEffect(() => {
        if (globeEl.current && GlobeModule) {
            const currentElement = globeEl.current;
            const containerWidth = currentElement.offsetWidth;

            const myGlobe = new GlobeModule()(currentElement)
                .width(containerWidth)
                .height(700)
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') 
                .backgroundColor('#22252a')
                .pointsData(seismicEvents.map(event => ({
                    id: event.id,
                    name: event.place,
                    magnitude: event.magnitude, 
                    time: event.time,
                    size: Math.max(event.magnitude / 15, 0.1),
                    lat: event.lat,
                    lng: event.lng,
                    alert: event.alert,
                    color: event.magnitude > 5 ? '#ff0000' : (event.magnitude > 3 ? '#ffa500' : '#00ff00')
                })))
                .pointLabel(d => `
                    <div><b>Local:</b> ${d.name}</div>
                    <div><b>Magnitude:</b> ${d.magnitude}</div>
                    <div><b>Horário:</b> ${new Date(d.time).toLocaleString()}</div>
                    <div><b>Latitude:</b> ${d.lat}</div>
                    <div><b>Longitude:</b> ${d.lng}</div>
                    ` 
                )
                .pointAltitude('size')
                .pointColor('color');

            myGlobe.pointOfView(pointsData);
        }
    }, [GlobeModule, globeEl, seismicEvents, pointsData]);

    
    return (
        <div ref={globeEl} style={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!GlobeModule && <p className='loading-text'>Carregando globo...</p>} 
        </div>
    )

}