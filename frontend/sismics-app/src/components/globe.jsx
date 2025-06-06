"use client"

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobeComponent({ seismicEvents, pointsData }) {
    const globeRef = useRef(null);
    const containerRef = useRef(null); 

    const [points, setPoints] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 500 });

    // Define as dimensões iniciais do globo
    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: 500
            });
        }
    }, []);

    // Processa os eventos sísmicos quando a prop for alterada
    useEffect(() => {
        if (seismicEvents) {
            const data = seismicEvents.map(event => ({
                id: event.id,
                name: event.place,
                magnitude: event.magnitude,
                time: event.time,
                size: Math.max(event.magnitude / 15, 0.1),
                lat: event.lat,
                lng: event.lng,
                alert: event.alert,
                color: event.magnitude > 5 ? '#ff0000' : (event.magnitude > 3 ? '#ffa500' : '#00ff00')
            }));
            setPoints(data);
        }
    }, [seismicEvents]);

    // Foca no ponto de vista quando a prop for alterada
    useEffect(() => {
        if (globeRef.current && pointsData) {
            globeRef.current.pointOfView(pointsData, 1000);
        }
    }, [pointsData]);

    return (
        <div ref={containerRef} style={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Globe
                ref={globeRef}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                backgroundColor='#22252a'
                pointsData={points}
                pointAltitude='size'
                pointColor='color'
                pointLabel={d => `
                    <div><b>Local:</b> ${d.name}</div>
                    <div><b>Magnitude:</b> ${d.magnitude}</div>
                    <div><b>Horário:</b> ${new Date(d.time).toLocaleString()}</div>
                    <div><b>Latitude:</b> ${d.lat}</div>
                    <div><b>Longitude:</b> ${d.lng}</div>
                `}
                width={dimensions.width}
                height={dimensions.height}
            />
        </div>
    );
}