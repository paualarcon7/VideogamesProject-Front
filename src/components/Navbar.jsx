import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, filterGenre, filterCreated, orderByName, orderByRating } from "../actions";
import s from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleGenreFilter(e) {
    e.preventDefault();
    dispatch(filterGenre(e.target.innerText));
  }

  function handleCreatedFilter(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.innerText))
  }
  


  function handleSortByName(e){
    
    dispatch(orderByName(e.target.innerText))
    
  }

  function handleSortByRating(e){
    dispatch(orderByRating(e.target.innerText))
  }

  return (
    <div className={s.dropdown}>
      <nav>
        <a href="/home">
          <img class={s.logo} src="pacman-banner.jpg" alt="pacman banner"/>
        </a>
        <ul>
          <li key="home">
            <a href="/home" class={s.principalFont}>
              Home
            </a>
          </li>
          <li key="genres">
            <a href="#" class={s.principalFont}>
              Generos
            </a>
            <ul class={s.secondaryFont}>
              {genres.map((g) => {
                return <li key={g.name} onClick={(e) => handleGenreFilter(e)}>{g.name}</li>;
              })}
            </ul>
          </li>
          <li key="order">
            <a href="#" class={s.principalFont}>
              Orden
            </a>
            <ul class={s.secondaryFont}>
              <li key="asc" onClick={(e) => handleSortByName(e)}>Ascendente A-Z</li>
              <hr />
              <li key="desc" onClick={(e) => handleSortByName(e)}>Descendente Z-A</li>
              <hr />
              <li key="+" onClick={(e) => handleSortByRating(e)}>Mayor Rating</li>
              <hr />
              <li key="-" onClick={(e) => handleSortByRating(e)}>Menor Rating</li>
            </ul>
          </li>
          <li key="yours">
            <a href="#" class={s.principalFont}>
              Tus juegos
            </a>
            <ul class={s.secondaryFont}>
              <li key="created" onClick={(e) => handleCreatedFilter(e)}>Creados por ti</li>
             <Link className={s.link} to="/create"><li key="create">Crear nuevo juego</li></Link>
            </ul>
          </li>
        </ul>
        
      </nav>
    </div>
  );
}
