import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";

export default function SearchBar(paginationSearchBar) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    //e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try
    {dispatch(getByName(name));
    console.log("SOY EL DISPATCH: ",dispatch(getByName(name)))}
    catch{
      alert("UPS error 404")
    }
    
  }

  


  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInput(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </>
  );
}
