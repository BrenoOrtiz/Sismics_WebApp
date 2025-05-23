import "./mainContent.css"
import SearchBar from "./searchBar"

export default function MainContent() { 
    return (
        <div className="mainContentContainer">
            <h1 className="title">Monitoramento de Abalo Sísmico</h1>
            <p className="description">Acompanhe em tempo real os abalos sísmicos ao redor do mundo.</p>
            <SearchBar/>
        </div>
    )
}