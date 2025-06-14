"use client";

import "./searchBar.css";
import { useState } from 'react';


export default function SearchBar({seismicEvents, handleFocusPoints}) {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);


    const allSuggestions = seismicEvents.map(event => event.place)

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === "") {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        } else {
            const filtered = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setFilteredSuggestions([]);
        setShowSuggestions(false);

        const foundEvent = seismicEvents.find(event => event.place === suggestion)

        handleFocusPoints(
            { lat: foundEvent.lat, lng: foundEvent.lng, altitude: 2.5 }    
        )
    };

    const handleFocus = () => {
        if (inputValue.trim() !== "" && filteredSuggestions.length > 0) {
            setShowSuggestions(true);
        } 
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 150);
    };

    return (
        <div className="mainSearchBarContainer">
            <input
                className="mainSearchInput"
                type="text"
                placeholder="Buscar localização (ex: Japão)"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                            // onMouseDown é usado para evitar que o onBlur do input feche a lista antes do onClick
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}