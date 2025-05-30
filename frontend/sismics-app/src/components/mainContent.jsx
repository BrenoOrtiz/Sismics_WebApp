"use client"

import axios from "axios"

import "./mainContent.css"
import SearchBar from "./searchBar"
import dynamic from 'next/dynamic';

import { useState, useEffect } from "react";

const GlobeComponent = dynamic(() => import("./globe"), { ssr: false });



export default function MainContent() {
    
    const [seismicEvents, setSeismicEvents] = useState([])
    const [focusPointsData, setFocusPointsData] = useState({ lat: 0, lng: 0, altitude: 2.5 })
    const [loading, setLoading] = useState(true); 
    
    
    useEffect(() => {
    
    const fetchSeismicEvents = async () => {
      setLoading(true); 
      try {
        const response = await axios.get("http://localhost:5000/api/earthquake/data") 
        const events = response.data.map(element => ({
          id: element.code, 
          magnitude: element.mag,
          place: element.place,
          time: new Date(element.time),
          lng: element.longitude, 
          lat: element.latitude,  
          alert: element.alert,
          depth: element.dmin, 
          tsunami: element.tsunami, 
    
        }))
        
        setSeismicEvents(events);
      }
      catch (error) {
        console.log("Erro ao buscar eventos sísmicos:", error);
        setSeismicEvents([]) 
      } finally {
        setLoading(false); 
      }
      
    };
    fetchSeismicEvents();
    
    }, [])
    
    return (
        <div className="mainContentContainer">
            <h1 className="title">Abalos sísmicos últimos 30 dias</h1>
            <p className="description">Acompanhe em tempo real os abalos sísmicos ao redor do mundo.</p>
            {loading ? (
                <p>Loading map and seismic data...</p> 
            ) : (
                <>
                    <SearchBar seismicEvents={seismicEvents} handleFocusPoints={setFocusPointsData}/>
                    <GlobeComponent seismicEvents={seismicEvents} pointsData={focusPointsData}/>
                </>
            )}
        </div>
    )
}

