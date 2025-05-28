"use client"

import "./globe.css"

import { useEffect, useRef, useState } from 'react';

export default function GlobeComponent({ seismicEvents }) { 

    const globeEl = useRef();
    const [GlobeModule, setGlobeModule] = useState(null);

    useEffect(() => {
        // Dynamically import globe.gl only on the client side
        import('globe.gl').then(module => {
            setGlobeModule(() => module.default); // Assuming Globe is the default export
        });
    }, []); // Empty dependency array ensures this runs once on mount

    useEffect(() => {
        // Initialize globe only after the Globe library is loaded and globeEl is available
        if (globeEl.current && GlobeModule) {
            const currentElement = globeEl.current;
            const containerWidth = currentElement.offsetWidth;

            const myGlobe = new GlobeModule()(currentElement)
                .width(containerWidth)
                .height(700)
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') 
                .backgroundColor('#22252a')
                .pointsData([ 
                // Implementar seismicEvents aqui
                    { lat: -23.5505, lng: -46.6333, size: 0.3, color: 'red', name: 'São Paulo' },
                    { lat: 35.6895, lng: 139.6917, size: 0.3, color: 'blue', name: 'Tokyo' }
                ])
                .pointLabel('name')
                .pointAltitude('size')
                .pointColor('color');

            myGlobe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
        }
    }, [GlobeModule, globeEl]);

    return (
        <div ref={globeEl} style={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!GlobeModule && <p className='loading-text'>Carregando globo...</p>} 
        </div>
    )

}