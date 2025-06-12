"use client";

import "./nav.css"

import Image from "next/image"
import useAuth from "../hooks/useAuth"

export default function NavBar() {

    const { isAuthenticated } = useAuth();

    return (
        <div className="navContainer">
            <Image className="logo" src="/logo.png" width={210} height={40} alt="logo.png" />
                {isAuthenticated ? (
                    <div className="navLinks">
                        <a href="/">Home</a>
                        <a href="/stats">Estatísticas</a>
                        <a href="/logout"><i className="fa-solid fa-right-from-bracket fa-xl" style={{color: "#e05252"}}></i></a>
                    </div>
                ) : (
                    <div className="navLinks">
                        <a href="/">Home</a>
                        <a href="/pricing" >Assinaturas</a>
                        <a href="/auth"><i className="fa-solid fa-right-to-bracket fa-xl" style={{color: "#e05252"}}></i></a>
                    </div>
                ) }
                
        </div>
    )

}

