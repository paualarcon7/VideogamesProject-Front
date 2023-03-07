import { React, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, cleanDetail, loadingAction } from "../actions";
import Loader from "./Loader";

export default function Detail(props) {
  const dispatch = useDispatch();
  const showLoading = useSelector((state) => state.showLoading);

  useEffect(() => {
    dispatch(loadingAction(true));
    dispatch(getDetail(props.match.params.id)); //accedo al id del detalle
    dispatch(cleanDetail());
  }, []);

  const videogame = useSelector((state) => state.detail);

  return (
    <>
      {showLoading ? (
        <Loader />
      ) : (
        <div>
          {videogame.length ? (
            <div style={{color:"white", marginTop:"40px"}}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src={videogame[0].image}
                    class="img-fluid rounded"
                    alt={videogame[0].name}
                    style={{marginLeft:"40rem"}}
                  />
                </div>
                <div>
                  <div class="card-body" style={{marginTop:"40px", justifyContent:"center"}}>
                    <h3 class="card-title" style={{marginBottom:"20px"}}>{videogame[0].name}</h3>
                    <p class="card-text">{videogame[0].description}</p>
                    <p class="card-text">
                      <medium style={{color:"white", backgroundColor:"black"}}>
                        Genres: {videogame[0].genres.map((g) => g.name + " ")}
                      </medium>
                    </p>
                    <p class="card-text">
                      <medium style={{color:"white", backgroundColor:"black"}}>
                        Released: {videogame[0].released}
                      </medium>
                    </p>
                    <p class="card-text">
                      <medium style={{color:"white", backgroundColor:"black"}}>
                        Rating: {videogame[0].rating}
                      </medium>
                    </p>
                    <p class="card-text">
                      <medium style={{color:"white", backgroundColor:"black"}}>
                        Platforms: {videogame[0].platforms.map((p) => p + " ")}
                      </medium>
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/home">
                <Button variant="light" style={{marginTop:"20px"}}>Back Home</Button>
              </Link>
            </div>
          ) : (
            <h1 style={{color:"white"}}>Not found</h1>
          )}
        </div>
      )}
    </>
  );
}

{
  /* <div > 
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

            </div> */
}
