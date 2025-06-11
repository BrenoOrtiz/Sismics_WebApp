"use client"

import "./statsContent.css"

import FilterDate from "./filterDate"
import StatsCard from "./statsCard"
import DataGraph from "./dataGraph"

export default function StatsContent() {

    return (

        <div className="stats-content">
            <h1 className="stats-title">Estatísticas</h1>
            <p className="stats-description">Aqui você pode visualizar as estatísticas dos dados sísmicos.</p>

            <FilterDate/>
            <div className="stats-container">
                <StatsCard
                    title="Total de Sismos"
                    value="1.234"
                    description="Número total de sismos registrados."
                />
                <StatsCard
                    title="Sismos por Magnitude"
                    value="5.6"
                    description="Magnitude média dos sismos registrados."
                />
                <StatsCard
                    title="Sismos por Profundidade"
                    value="10 km"
                    description="Profundidade média dos sismos registrados."
                />
                <DataGraph/>
            </div>
        </div>
    )

 }