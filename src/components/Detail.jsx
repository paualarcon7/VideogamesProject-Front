import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, cleanDetail } from "../actions";
import s from "../styles/Detail.module.css"
import Loader from "./Loader";

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id)) //accedo al id del detalle
        dispatch(cleanDetail()) 
    }, [])

    const videogame = useSelector ((state) => state.detail)
    

    return (
        <>
        
{videogame.length ? 

    
            <div className={s}> 
                <h1>{videogame[0].name}</h1>
                <img src={videogame[0].image} alt="videogame"/>
                <h2>Generos: {videogame[0].genres.map(g => g.name + (' '))}</h2>
                <li> Características generales:
                    <ul>Descripción: {videogame[0].description}</ul>
                    <ul>Fecha de lanzamiento: {videogame[0].released}</ul>
                </li>
                <li>Otras características:
                    <ul>Rating: {videogame[0].rating}</ul>
                    <ul>Plataformas soportadas: {videogame[0].platforms.map(p => p + (' '))}</ul>
                </li>
                <Link to='/home'>
            <button>Volver</button>
            </Link>

            </div> : <Loader className={s.loader}></Loader>}
        
        
        </>
    )
}