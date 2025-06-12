"use client"

import "./statsContent.css"

import { useState, useEffect } from "react"
import axios from "axios"


import FilterDate from "./filterDate"
import StatsCard from "./statsCard"
import DataGraph from "./dataGraph"

export default function StatsContent() {

    const [dateFilter, setDateFilter] = useState("24h");
    const [statsCardData, setStatsCardData] = useState([]);
    const [dataGraphData, setDataGraphData] = useState([]);
    const [loading, setLoading] = useState(true);

    const dateOptions = {
        "24h": new Date(Date.now() - 24 * 60 * 60 * 1000),
        "7d": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        "30d": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    };

    const url = "https://earthquake.usgs.gov/fdsnws/event/1/query";
    const params = { format: "geojson", starttime: dateOptions[dateFilter].toISOString().split('T')[0] };

    const chartConfig = [
        {
            depth: {
                label: "Profundidade",
                color: "hsl(var(--chart-1))",
            }
        },
        {
            magnitude: {
                label: "Magnitude",
                color: "hsl(var(--chart-1))",
            }
        }
    ]

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(url, { params });
                const data = response.data;
                const earthquakes = data.features;

                let totalEarthquakes = earthquakes.length;
                let totalMagnitude = 0;
                let totalDepth = 0;
                let totalFelt = 0;

                let depthData = [];
                let magnitudeData = [];

                earthquakes.forEach(earthquake => {
                    totalMagnitude += earthquake.properties.mag || 0;
                    totalDepth += earthquake.geometry.coordinates[2] || 0;
                    totalFelt += earthquake.properties.felt || 0;

                    const date = new Date(earthquake.properties.time);
                    const dia = date.getDate();
                    const mes = date.getMonth() + 1; // Janeiro é 0
                    const dateformatted = `${dia}`;
                    
                    depthData.push({ date: dateformatted, depth: earthquake.geometry.coordinates[2] || 0 });
                    magnitudeData.push({ date: dateformatted, magnitude: earthquake.properties.mag || 0 });
                })
                
                const averageMagnitude = (totalMagnitude / totalEarthquakes).toFixed(2);
                const averageDepth = (totalDepth / totalEarthquakes).toFixed(2);
                setStatsCardData([
                    { title: "Total de Abalos Sísmicos", value: totalEarthquakes, description: "Número total de abalos sísmicos registrados." },
                    { title: "Magnitude média", value: averageMagnitude, description: "Magnitude média dos abalos sísmicos registrados." },
                    { title: "Profundidade média", value: `${averageDepth}km`, description: "Profundidade média dos abalos sísmicos." },
                    { title: "Total de Relatos", value: totalFelt, description: "Número total de relatos de pessoas que sentiram abalos sísmicos." }
                ]);

                setDataGraphData([depthData, magnitudeData]);
            }
            catch (error) {
                console.error("Erro ao buscar dados sísmicos:", error);
                setStatsCardData([]);
                setLoading(false);
            } 
            finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [dateFilter])

    return (

        <div className="stats-content">
            <h1 className="stats-title">Estatísticas</h1>
            <p className="stats-description">Aqui você pode visualizar as estatísticas dos dados sísmicos.</p>
            <FilterDate handleDate={setDateFilter} />
            {loading ? (<div>carregando</div>) : (
                <div className="stats-container">
                    {statsCardData.map((card, index) => (
                        <StatsCard 
                            key={index} 
                            title={card.title} 
                            value={card.value} 
                            description={card.description} 
                        />
                    ))}
                    <DataGraph title="Terremotos por profundidade" description="Numero de terremotos a cada profundidade" chartData={dataGraphData[0]} chartConfig={chartConfig[0]} xAxis="depth"/>
                    <DataGraph title="Terremotos por Magnitude" description="Magnitude média dos terremotos registrados." chartData={dataGraphData[1]} chartConfig={chartConfig[1]} xAxis="magnitude"/>
                </div>
            ) }
            
        </div>
    )

 }