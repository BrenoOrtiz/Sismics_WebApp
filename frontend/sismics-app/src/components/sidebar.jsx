import "./sideBar.css"
import RealTime from "../components/realTime"
import SearchBarSide from "./searchBarSide";

export default function Sidebar() {

    const seismicEvents = [
        { id: 1, name: "Tokyo", magnitude: 5.2 },
        { id: 2, name: "Nova Guinea", magnitude: 3.1 },
        { id: 3, name: "Argentina", magnitude: 6.8 },
        { id: 4, name: "Brazil", magnitude: 4.5 },
    ]
    return (
        <div className="sidebarContainer">
            <SearchBarSide/>
            <RealTime data={seismicEvents} />
        </div>
    );
 }