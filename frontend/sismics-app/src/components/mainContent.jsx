"use client"


import "./mainContent.css"
import SearchBar from "./searchBar"
import dynamic from 'next/dynamic';

const GlobeComponent = dynamic(() => import("./globe"), { 
    ssr: false, 
    loading: () => <p>Carregando Globo...</p>
});

export default function MainContent({seismicEvents}) {
    

    return (
        <div className="mainContentContainer">
            <h1 className="title">Monitoramento de Abalo Sísmico</h1>
            <p className="description">Acompanhe em tempo real os abalos sísmicos ao redor do mundo.</p>
            <SearchBar />
            <GlobeComponent seismicEvents={seismicEvents}/>
        </div>
    )
}

