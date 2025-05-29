"use client"

import "./globals.css";


import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "../components/nav";
import Sidebar from "../components/sideBar";
import MainContent from "../components/MainContent";

export default function Home() {
  
  const [seismicEvents, setSeismicEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchSeismicEvents = async () => {
      try {
        const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
        const events = response.data.features.map(element => ({
          id: element.id,
          magnitude: element.properties.mag,
          place: element.properties.place,
          time: new Date(element.properties.time),
          lng: element.geometry.coordinates[0],
          lat: element.geometry.coordinates[1],
          alert: element.properties.alert,
          depth: element.properties.dmin,
          tsumnami: element.properties.tsunami,
  
        }))
        
        setSeismicEvents(events);
        setLoading(false);
      }
      catch (error) {
        console.log("Erro ao buscar eventos sísmicos:", error);
        setSeismicEvents([])
      }
      
    };
    fetchSeismicEvents();

   }, [])


  return (
    <div>
      <NavBar />
      <div className="content-container">
        {loading ? (
          <div className="loading-div"></div>
        ): (
            <>
            <Sidebar seismicEvents={seismicEvents}/>
            <MainContent seismicEvents={seismicEvents} />
           </> 
        ) }
        
      </div>

    </div>
  );
}
