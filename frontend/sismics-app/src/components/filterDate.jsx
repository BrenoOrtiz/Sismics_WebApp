"use client";

import "./filterDate.css";


export default function FilterDate({ handleDate }) {
    
    const handleChange = (event) => {
        handleDate(event.target.value);
    };

    return (
        <select className="select" onChange={handleChange}>
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
        </select>
    )
 }