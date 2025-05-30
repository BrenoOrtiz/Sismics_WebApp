import "./sideBar.css"
import SideBarData from "../components/SideBarData"
import SearchBarSide from "./searchBarSide"

import axios from "axios";

import { useState, useEffect } from "react"

export default function Sidebar() {

    const [searchPlace, setSearchPlace] = useState("")
    const [seismicEvents, setSeismicEvents] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
    const fetchSeismicEvents = async () => {
      setLoading(true);
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
          tsunami: element.properties.tsunami, 
  
        }))
        
        setSeismicEvents(events);
      } catch (error) {
        console.log("Erro ao buscar eventos sísmicos:", error);
        setSeismicEvents([]);
      } finally {
        setLoading(false);
      }
      
    };
    fetchSeismicEvents();

   }, [])

    return (
        <div className="sidebarContainer">
            <SearchBarSide handleSearch={setSearchPlace} searchValue={searchPlace} />
            {loading ? (
                <p>Loading seismic events...</p>
            ) : (
                <SideBarData data={seismicEvents} searchString={searchPlace} />
            )}
        </div>
    );
 }