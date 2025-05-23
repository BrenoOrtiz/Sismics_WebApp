"use client"

import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import "./mainContent.css"
import SearchBar from "./searchBar"

export default function MainContent() {
    const globeEl = useRef();

    useEffect(() => {
        if (globeEl.current) {
            const myGlobe = new Globe()(globeEl.current)
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // Exemplo de imagem
                .pointsData([ // Exemplo de dados de pontos
                    { lat: -23.5505, lng: -46.6333, size: 0.5, color: 'red', name: 'São Paulo' },
                    { lat: 35.6895, lng: 139.6917, size: 0.5, color: 'blue', name: 'Tokyo' }
                ])
                .pointLabel('name')
                .pointAltitude('size')
                .pointColor('color');

            // Opcional: Configurar a câmera inicial
            myGlobe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
        }
    }, []);

    return (
        <div className="mainContentContainer">
            <h1 className="title">Monitoramento de Abalo Sísmico</h1>
            <p className="description">Acompanhe em tempo real os abalos sísmicos ao redor do mundo.</p>
            <SearchBar/>
            <div ref={globeEl} style={{ width: '100%', height: '500px' }}></div> {/* Container para o globo */}
        </div>
    )
}