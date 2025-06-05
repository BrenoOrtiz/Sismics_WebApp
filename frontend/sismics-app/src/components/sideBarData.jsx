"use client"

import "./SideBarData.css";
import Link from "next/link";

export default function SideBarData(props) {


    const filteredData = props.data.filter(item => 
        item.place.toLowerCase().includes(props.searchString.toLowerCase())
    );

    return (
        <div className="SideBarDataContainer">
            <h2 className="Title">Ultima hora</h2>
            {filteredData
                .sort((a, b) => b.magnitude - a.magnitude)
                .map((item) => {
                let currentMagnitudeColor;
                if (item.magnitude > 5) {
                    currentMagnitudeColor = "#E63946"; 
                } else {
                    currentMagnitudeColor = "#007B8A"; 
                }
                return (
                    <div key={item.id} className="itemContainer">
                        <Link className="itemLink" href={`/details/${item.id}`} passHref>
                            <div className="itemName">{item.place}</div>
                        </Link>

                        <div style={{ color: currentMagnitudeColor, marginLeft: 8 }}>{item.magnitude.toFixed(1)}</div>
                    </div>
                )
             }) }

        </div>
    )
 }