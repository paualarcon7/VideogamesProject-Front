import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  filterGenre,
  filterCreated,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import icon from "../icons/joystick.ico";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

export default function Navigationbar({setCurrentPage}) {

  const showLoading = useSelector((state) => state.showLoading);

  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleGenreFilter(e) {
    e.preventDefault();
    dispatch(filterGenre(e.target.innerText));
    setCurrentPage(1)
  }

  function handleCreatedFilter(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.innerText));
    setCurrentPage(1)
  }

  function handleSortByName(e) {
    dispatch(orderByName(e.target.innerText));
    setCurrentPage(1)
  }

  function handleSortByRating(e) {
    dispatch(orderByRating(e.target.innerText));
    setCurrentPage(1)
  }

  return (
  <div className="divStyle"> 
    <nav class="navbar navbar-expand-lg bg-light">
      <a class="navbar-brand">
        <img src={icon} width="45" height="40" alt="" style={{marginLeft:"20px"}}/>{" "}
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/home">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Order by
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a
                key="asc"
                class="dropdown-item"
                href="#"
                onClick={(e) => handleSortByName(e)}
              >
                Ascendent A-Z
              </a>
              <div class="dropdown-divider"></div>
              <a
                key="desc"
                class="dropdown-item"
                href="#"
                onClick={(e) => handleSortByName(e)}
              >
                Descendent Z-A
              </a>

              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="#"
                key="+"
                onClick={(e) => handleSortByRating(e)}
              >
                Highest rating
              </a>

              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="#"
                key="-"
                onClick={(e) => handleSortByRating(e)}
              >
                Lower rating
              </a>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Genres
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              {genres.map((g) => {
                return (
                  <>
                    <a
                      class="dropdown-item"
                      href="#"
                      key={g.name}
                      onClick={(e) => handleGenreFilter(e)}
                    >
                      {g.name}
                    </a>
                    <div class="dropdown-divider"></div>
                  </>
                );
              })}
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Your games
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a
                key="Created by you"
                class="dropdown-item"
                href="#"
                onClick={(e) => handleCreatedFilter(e)}
              >
                Created by you
              </a>
              <div class="dropdown-divider"></div>
              <a
               class="nav-link" 
               href="/create" 
                key="-"
              >
                Create one now!
              </a>
            </div>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="/create">
              Create your own
            </a>
          </li> */}
        </ul>
        <SearchBar></SearchBar>
      </div>
    </nav>
    {/* {showLoading && <Loader />} */}
    </div>

  );
}
