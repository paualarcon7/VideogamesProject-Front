import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame } from "../actions";
import { Badge, Button, Form, Image, InputGroup, Select} from "react-bootstrap";

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
    if (!input.genres.includes(e.target.value)){
    setInput({
      ...input,
      genres: [...input.genres, e.target.value], //concatena en un arreglo el estado input que ya tenia y todo lo que se vaya seleccionando
    });
    console.log(input);}
  }

  function handlePlatformSelect(e) {
    if (!input.platforms.includes(e.target.value)){
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    console.log(input);}
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
    const errors = validate(input);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(postVideogame(input));
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
    }else {
      alert("Please fill out all required fields");
    }
  }

  return (
    <div>
      <Link to="/home">
        <Button variant="light" style={{marginTop:"20px"}} >Back home</Button>
      </Link>
      <h1 style={{color:"white", marginTop:"20px"}}>Create your own videogame!</h1>

      <Form onSubmit={(e) => handleSubmit(e)} style={{width:"50rem", display:"flex", flexDirection:"column", alignItems:"stretch", marginLeft:"35rem", marginTop:"30px", color:"white"}}>
        <Form.Group controlId="formName">
          <Form.Label >Name:</Form.Label>
          <Form.Control
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleOnChange(e)}
            required
            style={{width:"50rem"}}
          />
          {/* {errors.name && <h3>{errors.name}</h3>} */}
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label  style={{marginTop:"15px"}}>Image:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => handleOnChange(e)}
            name="image"
            value={input.image}
            placeholder="enter image URL..."
            required
          />
          {errors.image && <h3>{errors.image}</h3>}
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label style={{marginTop:"15px"}}>Release date:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => handleOnChange(e)}
            name="released"
            value={input.released}
            placeholder="YYYY-MM-DD"
            required
          />
          {errors.released && <h3>{errors.released}</h3>}
        </Form.Group>

        <Form.Group controlId="formRating">
          <Form.Label style={{marginTop:"15px"}}>Rating:</Form.Label>
          <Form.Control
            type="number"
            value={input.rating}
            name="rating"
            placeholder="1 - 5"
            onChange={(e) => handleOnChange(e)}
            required
            min="1"
            max="5"
          />
          {errors.rating && <h3>{errors.rating}</h3>}
        </Form.Group>

        <Form.Group controlId="formRating">
          <Form.Label style={{marginTop:"15px"}}>Genres:</Form.Label>
          <Form.Select
            name="genres"
            onChange={(e) => handleGenreSelect(e)}
            value={input.genres}
            required
          >
            <option>Select an option...</option>
            {genres.map((g) => {
              return <option value={g.name} key={g.name} disabled={g.name === input.genres}>{g.name}</option>;
            })}
          </Form.Select>
          {errors.genres && <h3>{errors.genres}</h3>}
        </Form.Group>
        {input.genres.map((el) => (
                    <Badge style={{ cursor: 'pointer' }} key={el} pill bg="warning" text="dark" className="mb-2 mr-2 mt-2" onClick={() => handleDelete(el)}>
                        {el}  X
                    </Badge>
                ))}

        <Form.Group controlId="formRating">
          <Form.Label style={{marginTop:"15px"}}>Platforms:</Form.Label>
          <Form.Control
            name="platforms"
            as="select"
            onChange={(e) => handlePlatformSelect(e)}
            required
          >
            
            <option>Select a platform...</option>
            <option value="PC">PC</option>
            <option value="Linux">Linux</option>
            <option value="macOS">macOS</option>
            <option value="Android">Android</option>
            <option value="iOs">iOs</option>
            <option value="PS2">PlayStation 2</option>
            <option value="PS3">PlayStation 3</option>
            <option value="PS4">PlayStation 4</option>
            <option value="PS5">PlayStation 5</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Xbox Series S/X">Xbox Series S/X</option>
            <option value="PS Vita">PS Vita</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </Form.Control>
          {errors.platforms && <h3>{errors.platforms}</h3>}
        </Form.Group>

        {input.platforms.map((el) => (
                    <Badge style={{ cursor: 'pointer' }} key={el} pill bg="warning" text="dark" className="mb-2 mr-2 mt-2" onClick={() => handleDelete(el)}>
                        {el}  X
                    </Badge>
                ))}

        <Form.Group controlId="formRating">
          <Form.Label style={{marginTop:"15px"}}>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={input.description}
            name="description"
            onChange={(e) => handleOnChange(e)}
            placeholder='Describe your game here'
            required
          />
          {errors.description && <h3>{errors.description}</h3>}
          </Form.Group>

        <Button type="submit" variant="light" style={{marginTop:"20px"}}>Create</Button>

      </Form>
    </div>
  );
}
