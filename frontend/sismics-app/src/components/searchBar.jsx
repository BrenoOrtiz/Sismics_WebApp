import "./searchBar.css"

export default function SearchBar() { 
    return (
        <div className="mainSearchBarContainer">
            <input className="mainSearchInput" type="text" placeholder="Buscar localização (ex: Japão)"/>
        </div>
    )
 }