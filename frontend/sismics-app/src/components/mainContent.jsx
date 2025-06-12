"use client"

import axios from "axios"

import "./mainContent.css"
import SearchBar from "./searchBar"
import GlobeComponent from "./globe";
import { useState, useEffect } from "react";


export default function MainContent() {
    
    const [seismicEvents, setSeismicEvents] = useState([])
    const [focusPointsData, setFocusPointsData] = useState({ lat: 0, lng: 0, altitude: 2.5 })
    const [loading, setLoading] = useState(true); 
    
    
    useEffect(() => {
    
    const fetchSeismicEvents = async () => {
      setLoading(true); 
      try {
        const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson") 
        const events = response.data.features.map(element => ({
          id: element.id,
          magnitude: element.properties.mag,
          place: element.properties.place,
          time: new Date(element.properties.time),
          lng: element.geometry.coordinates[0],
          lat: element.geometry.coordinates[1],  
          alert: element.properties.alert,
    
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
            <h1 className="title">Abalos sísmicos</h1>
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

