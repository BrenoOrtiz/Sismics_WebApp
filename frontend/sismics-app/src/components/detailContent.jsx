import "./detailContent.css";

import EarthquakeDetail from "./earthquakeDetail";
import RadiusData from "./radiusData";

export default function DetailContent({data}) { 

    const location = {"lat": data.lat, "lng": data.lng};

    return (
        <div className="detail-content-container">
            <h1 className="title">Detalhes de Terremoto</h1>
            <p className="local">{data.place}</p>
            <EarthquakeDetail data={data} />
            <RadiusData location={location} />
        </div>
    )
}