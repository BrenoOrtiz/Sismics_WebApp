"use client"

import "./statsCard.css"

export default function StatsCard({ title, value, description }) {

    return (
        <div>
            <div className="stats-card">
                <h2 className="stats-card-title">{title}</h2>
                <div className="stats-card-value">{value}</div>
                {description && <p className="stats-card-description">{description}</p>}
            </div>
        </div>
    )
 }