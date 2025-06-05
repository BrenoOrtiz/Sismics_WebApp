import "detailContent.css";

import EarthquakeDetail from "./eathquakeDetail";

export default function DetailContent({data}) { 

    return (
        <div className="detail-content-container">
            <h1 className="title">Detalhes de Terremoto</h1>
            <p className="local">{data.place}</p>
            <EarthquakeDetail data={data} />
        </div>
    )
}