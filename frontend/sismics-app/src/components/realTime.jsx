import "./realTime.css";


export default function RealTime(props) {


    return (
        <div className="realTimeContainer">
            <h2 className="Title">Tempo Real</h2>
            {props.data.map((item) => {
                let currentMagnitudeColor; // Variável local para a cor do item atual
                if (item.magnitude > 5) {
                    currentMagnitudeColor = "#E63946"; // Vermelho (accent color)
                } else {
                    currentMagnitudeColor = "#007B8A"; // Verde (você pode ajustar para sua variável --secondary se preferir)
                }
                return (
                    <div key={item.id} className="itemContainer">
                        <div className="itemName">{item.name}</div>
                        <div style={{ color: currentMagnitudeColor }}>{item.magnitude}</div> {/* Corrigido para 'color' e usando a variável local */}
                    </div>
                )
             }) }

        </div>
    )
 }