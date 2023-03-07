import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, loadingAction } from "../actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import Pagination from "./Pagination";
/* import Loader from "./Loader"; */
import s from "../styles/Home.modules.css";
import Loader from "./Loader";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const showLoading = useSelector((state) => state.showLoading);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(8);

  const lastGame = currentPage * gamesPerPage;
  const firstGame = lastGame - gamesPerPage;
  const currentGames = allVideogames.slice(firstGame, lastGame);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (allVideogames.length === 0) {
      dispatch(loadingAction(true));
      dispatch(getVideogames());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <React.Fragment>
      <Navbar setCurrentPage={setCurrentPage} />
      {showLoading ? (
        <Loader />
      ) : (
        <div className="Cards container col mt-4 py-5">
          {allVideogames.length > 0 ? (
            <>
              {currentGames?.map((el) => {
                return (
                  <section>
                    <Link to={"/home/" + el.id}>
                      <Card
                        name={el.name}
                        image={el.image}
                        genres={el.genres.map((g) => {
                          return `${g.name} `;
                        })}
                        key={el.id}
                      />
                    </Link>
                  </section>
                );
              })}
            </>
          ) : (
            <div>NOT FOUND</div>
          )}
        </div>
      )}

      <Pagination
        gamesPerPage={gamesPerPage}
        allVideogames={allVideogames.length}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        key="pagination"
        className={s}
      />

      {/* { allVideogames.length > 0 ?
          ({currentGames?.map((el) => {
            return (
              <div className={s.card}>
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    genres={el.genres.map((g) => {
                      return `${g.name} `;
                    })}
                    key={el.id}
                  ></Card>
                </Link> }) : (
               <div>
                  <Loader />
               </div>
            )
              </div> 
            );
          })}  */}
    </React.Fragment>
  );
}