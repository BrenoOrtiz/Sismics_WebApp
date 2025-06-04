
import NavBar from "@/components/nav";
import Sidebar from "@/components/sideBar";
import DetailContent from "@/components/detailContent";

export default async function DetailsPage({params}) {
    const {id} = await params;

    return (
        <div>
            <NavBar />
            <div className="content-container">
                <Sidebar/>
                <DetailContent/>
            </div>

        </div>
    )

 }