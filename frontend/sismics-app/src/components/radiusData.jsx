"use client";

import "./radiusData.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RadiusData({ location}) {

    const [radius, setRadius] = useState(300);
    const [radiusData, setRadiusData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchRadiusData = async () => {
            try {
                const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${location.lat}&longitude=${location.lng}&maxradiuskm=${radius}`)
                const data = response.data.features.map(event => ({
                    id: event.id,
                    magnitude: event.properties.mag,
                    place: event.properties.place,
                    time: new Date(event.properties.time),
                    lng: event.geometry.coordinates[0],
                    lat: event.geometry.coordinates[1],
                    alert: event.properties.alert,
                }));
                setRadiusData(data);
                setLoading(false);
            }
            catch (error) {
                
            }
        }
        fetchRadiusData();
    }, [radius])
    
    // Função para formatar a data
    const formatTime = (date) => {
        if (!(date instanceof Date)) {
            return 'Data Inválida';
        }
        return date.toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };


    // Função para determinar a classe CSS do alerta
    const getAlertClass = (alert) => {
        if (!alert) return 'alert-none';
        switch (alert.toLowerCase()) {
        case 'green':
            return 'alert-green';
        case 'yellow':
            return 'alert-yellow';
        case 'orange':
            return 'alert-orange';
        case 'red':
            return 'alert-red';
        default:
            return 'alert-none';
        }
    };

    return (
        <div className="radius-data-container">
            <h2 className="radius-title">Dados de Raio</h2>
            <p className="radius-description">Selecione o raio para visualizar os dados sísmicos ao redor do ponto selecionado.</p>
            <div className="radius-controls">
                <label htmlFor="radius-input" className="radius-label">Raio (km):</label>
                <input
                    type="number"
                    id="radius-input"
                    min="100"
                    max="1000"
                    defaultValue={100}
                    onChange={(e) => setRadius(e.target.value)}
                    className="radius-input"
                />
            </div>

            <div className="tableContainer">
                {radiusData && radiusData.length > 0 ? (
                    <table className="earthquakeTable"> 
                    <thead>
                        <tr>
                        <th>Lugar</th>
                        <th>Magnitude</th>
                        <th>Data</th>
                        <th>Alerta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {radiusData.map((event) => (
                        <tr key={event.id}>
                            <td>{event.place}</td>
                            <td className="magnitude">{event.magnitude?.toFixed(1)}</td> 
                            <td>{formatTime(event.time)}</td>
                            <td>
                            <span className={`alert ${getAlertClass(event.alert)}`}> 
                                {event.alert ? event.alert : 'Nenhum'}
                            </span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="noData">Nenhum terremoto encontrado para os critérios especificados.</p>
                )}
            </div>
        </div>
    )

 }