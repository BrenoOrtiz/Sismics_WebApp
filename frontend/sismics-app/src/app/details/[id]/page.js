"use client";

import axios from "axios";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import NavBar from "@/components/nav";
import Sidebar from "@/components/sideBar";
import DetailContent from "@/components/detailContent";

export default function DetailsPage() {
    const { id } = useParams();
    
    const [earthquakeDetails, setEarthquakeDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEarthquakeDetails = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=${id}`)
                setEarthquakeDetails({
                    id: id,
                    mag: response.data.properties.mag,
                    place: response.data.properties.place,
                    time: new Date(response.data.properties.time),
                    lng: response.data.geometry.coordinates[0],
                    lat: response.data.geometry.coordinates[1],
                    alert: response.data.properties.alert,
                    tsunami: response.data.properties.tsunami,
                    depth: response.data.geometry.coordinates[2],
                    status: response.data.properties.status,
                    felt: response.data.properties.felt || 0,
                    source: "USGS"
                })
            }
            catch(err) {
                console.error("Error:", err);
            }
            finally {
                setLoading(false);
            }
        }
        getEarthquakeDetails(id)
     }, [])


    return (
        <div>
            <NavBar />
            <div className="content-container">
                <Sidebar/>
                {loading ? <p>Carregando</p> : <DetailContent data={earthquakeDetails} />}
            </div>

        </div>
    )

 }