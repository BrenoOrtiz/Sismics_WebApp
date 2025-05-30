"use client"

import "./globals.css";

import NavBar from "../components/nav";
import Sidebar from "../components/sideBar";
import MainContent from "../components/MainContent";

export default function Home() {

  return (
    <div>
      <NavBar />
      <div className="content-container">
            <Sidebar/>
            <MainContent/> 
      </div>

    </div>
  );
}
