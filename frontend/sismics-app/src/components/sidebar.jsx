import "./sideBar.css"
import RealTime from "../components/realTime"
import SearchBarSide from "./searchBarSide";

export default function Sidebar({seismicEvents }) {

    return (
        <div className="sidebarContainer">
            <SearchBarSide/>
            <RealTime data={seismicEvents} />
        </div>
    );
 }