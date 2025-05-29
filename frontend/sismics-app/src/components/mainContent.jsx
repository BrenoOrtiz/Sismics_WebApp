"use client"


import "./mainContent.css"
import SearchBar from "./searchBar"
import dynamic from 'next/dynamic';

import { useState } from "react";

const GlobeComponent = dynamic(() => import("./globe"), {ssr: false});

export default function MainContent({seismicEvents}) {
    
    const [focusPointsData, setFocusPointsData] = useState({ lat: 0, lng: 0, altitude: 2.5 });

    return (
        <div className="mainContentContainer">
            <h1 className="title">Monitoramento de Abalo Sísmico</h1>
            <p className="description">Acompanhe em tempo real os abalos sísmicos ao redor do mundo.</p>
            <SearchBar seismicEvents={seismicEvents} handleFocusPoints={setFocusPointsData} />
            <GlobeComponent seismicEvents={seismicEvents} pointsData={focusPointsData} />
        </div>
    )
}

