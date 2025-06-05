
import "./earthquakeDetail.css";

export default function EarthquakeDetail({data}) { 

    return (
        <div className="earthquake-details-container">

            <div className="detail-row">
                <div className="detail-item">
                    <h2 className="detail-title">Magnitude</h2>
                    <p className="detail-value">{data.mag}</p>
                </div>

                <div className="detail-item">
                    <h2 className="detail-title">Status</h2>
                    <p className="detail-value">{data.status}</p>
                </div>
            </div>

            <div className="detail-row">
                <div className="detail-item">
                    <h2 className="detail-title">Time</h2>
                    <p className="detail-value">{data.time.toLocaleString()}</p>
                </div>

                <div className="detail-item">
                    <h2 className="detail-title">Alerta</h2>
                    <p className="detail-value">{data.alert ? data.alert : "Nenhum"}</p>
                </div>
            </div>

            <div className="detail-row">
                <div className="detail-item">
                    <h2 className="detail-title">Profundidade</h2>
                    <p className="detail-value">{data.depth}</p>
                </div>

                <div className="detail-item">
                    <h2 className="detail-title">Tsunami</h2>
                    <p className="detail-value">{data.tsunami ? 'Sim': 'Não'}</p>
                </div>
            </div>

            <div className="detail-row">
                <div className="detail-item">
                    <h2 className="detail-title">Latitude</h2>
                    <p className="detail-value">{data.lat}</p>
                </div>

                <div className="detail-item">
                    <h2 className="detail-title">Longitude</h2>
                    <p className="detail-value">{data.lng}</p>
                </div>
            </div>

            <div className="detail-row">
                <div className="detail-item">
                    <h2 className="detail-title">Fonte</h2>
                    <p className="detail-value">{data.source}</p>
                </div>

                <div className="detail-item">
                    <h2 className="detail-title">Relatos</h2>
                    <p className="detail-value">{data.felt}</p>
                </div>
            </div>

        </div>
    )
}