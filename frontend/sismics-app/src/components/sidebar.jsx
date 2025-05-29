import "./sideBar.css"
import SideBarData from "../components/SideBarData"
import SearchBarSide from "./searchBarSide";

import { useState } from "react";

export default function Sidebar({seismicEvents}) {

    const [searchPlace, setSearchPlace] = useState("")

    return (
        <div className="sidebarContainer">
            <SearchBarSide handleSearch={setSearchPlace} searchValue={searchPlace} />
            <SideBarData data={seismicEvents} searchString={searchPlace} />
        </div>
    );
 }