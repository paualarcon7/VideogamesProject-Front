import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame } from "../actions";
import s from "../styles/Create.module.css";

export default function VideogameCreation() {
  const dispatch = useDispatch();
  const history = useHistory(); //redirige a una ruta especifica
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    genres: [],
    description: "",
    platforms: [],
    released: "",
    rating: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Se requiere un nombre";
    } else if (!input.description) {
      errors.description = "Se requiere una descripción";
    } else if (input.rating < 1 || input.rating > 5) {
      errors.rating = "Debes indicar un nro del 1 al 5";
    } else if (!input.released) {
      errors.released = "Se requiere fecha";
    } else if (!input.image) {
      errors.image = "Se requiere link de imagen";
    }
    return errors;
  }

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleGenreSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value], //concatena en un arreglo el estado input que ya tenia y todo lo que se vaya seleccionando
    });
    console.log(input);
  }

  function handlePlatformSelect(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    console.log(input);
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== el),
      platforms: input.platforms.filter((p) => p !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("Estamos procesando tu juego...");
    setInput({
      name: "",
      genres: [],
      description: "",
      platforms: [],
      released: "",
      rating: "",
      image: "",
    });
    history.push("/home");
  }

  return (
    <div className={s.fonts}>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu propio juego!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button className={s.createButton} type="submit">
          {" "}
          Crear{" "}
        </button>

        <div className={s.InputDiv}>
          <label>Imagen:</label>

          <input
            type="text"
            onChange={(e) => handleOnChange(e)}
            name="image"
            value={input.image}
          />
          {errors.image && <h3 className={s.errors}>{errors.image}</h3>}
        </div>

        <div className={s.InputDiv}>
          <label>Fecha (dd/mm/aa):</label>

          <input
            type="text"
            onChange={(e) => handleOnChange(e)}
            name="released"
            value={input.released}
          />
          {errors.released && <h3 className={s.errors}>{errors.released}</h3>}
        </div>

        <div className={s.InputDiv}>
          <label>Rating:</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.rating && <h3 className={s.errors}>{errors.rating}</h3>}
        </div>

        <div className={s.InputDiv}>
          <label>Géneros: </label>
          <select name="genres" onChange={(e) => handleGenreSelect(e)}>
            {genres.map((g) => {
              return <option value={g.name}>{g.name}</option>;
            })}
          </select>
          {errors.genres && <h3 className={s.errors}>{errors.genres}</h3>}
        </div>

        <div className={s.InputDiv}>
          <label>Plataformas: </label>
          <select name="platforms" onChange={(e) => handlePlatformSelect(e)}>
            <option value="PC">PC</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOS</option>
            <option value="Android">Android</option>
            <option value="iOs">iOs</option>
            <option value="PS2">PlayStation 2</option>
            <option value="PS3">PlayStation 3</option>
            <option value="PS4">PlayStation 4</option>
            <option value="PS5">PlayStation 5</option>
            <option value="XOne">Xbox One</option>
            <option value="360">Xbox 360</option>
            <option value="S/X">Xbox Series S/X</option>
            <option value="Vita">PS Vita</option>
            <option value="Switch">Nintendo Switch</option>
          </select>
          {errors.platforms && <h3 className={s.errors}>{errors.platforms}</h3>}
        </div>

        <div className={s.InputDiv}>
          <label>Descripción: </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.description && (
            <h3 className={s.errors}>{errors.description}</h3>
          )}
        </div>
        <div className={s.InputDiv}>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.name && <h3 className={s.errors}>{errors.name}</h3>}
        </div>
      </form>

      {input.genres.map((el) => (
        <div>
          <h3 className={s.delete}>{el}</h3>
          <button className={s.buttonX} onClick={() => handleDelete(el)}>
            x
          </button>
        </div>
      ))}

      {input.platforms.map((el) => (
        <div>
          <h3 className={s.delete}>{el}</h3>
          <button className={s.buttonX} onClick={() => handleDelete(el)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}
