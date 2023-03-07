import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function LandingPage() {
    return (
        <div>
            <h1 style={{color:"white", marginTop:"20px"}}>Welcome!</h1>
            <h2  style={{color:"white"}}>The most varied videogames page</h2>
            <h2  style={{color:"white"}}>↓↓↓↓↓ Are you ready? ↓↓↓↓↓ </h2>
            <Link to= '/home'>
                <Button variant="light" style={{marginTop:"20px"}} >Start</Button>
            </Link>
        </div>
    )
}