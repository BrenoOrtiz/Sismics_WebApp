import "./searchBarSide.css";


export default function SearchBarSide({handleSearch, searchValue}) {



    return (
        <div className="sideSearchBarContainer">
            <input
                className="sideSearchInput"
                type="text"
                placeholder="Buscar localização..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
 }