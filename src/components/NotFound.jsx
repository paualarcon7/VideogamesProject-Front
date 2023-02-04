
import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/NotFound.module.css"


const NotFound = () => {
    return(
        
            <div>
                <Link to ='/home'>
                    <button>Atrás</button>
                </Link>
                <h1 color="white">404 NOT FOUND</h1>
            </div>
        
        );
};

export default NotFound;