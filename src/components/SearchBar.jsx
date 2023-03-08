import { React, useState } from "react";
import Autosuggest from 'react-autosuggest'
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getByName, loadingAction, searchLoadingAction } from "../actions";
import '../styles/SearchBar.modules.css'
import Loader from "./Loader";

export default function SearchBar() {

  const [gamesFiltered, setGamesFiltered] = useState([])
  const [name, setName] = useState("");
  const [selection, setSelection]= useState([]);

  
  const allVideogames = useSelector((state) => state.videogames);

  const dispatch = useDispatch();

  const onSuggestionsFetchRequested=()=>{
    setGamesFiltered(filterG(name));
  }

  const filterG = (name) => {
    
    const inputLength=name.length;
    const lowerCaseName = name.toLowerCase();

    var filteredGames = allVideogames.filter(el => el.name.toLowerCase().includes(lowerCaseName))

    return inputLength === 0 ? [] : filteredGames;
  }

  const onSuggestionsClearRequested = () =>{
    setGamesFiltered([]);
    }

    const getSuggestionValue=(suggestion)=>{
      return suggestion.name;
  }

  const renderSuggestion=(suggestion)=>(
    <div className='sugerencia' onClick={()=>selectClick(suggestion)}>
      {`${suggestion.name}`}
    </div>
  );

  const selectClick=(game)=>{
    setSelection([game]);
  }

  const onChange=(e, {newValue})=>{
    setName(newValue);

  }

  const inputProps={
    placeholder:"Search...",
    value: name,
    onChange
    };

    const handleClick = (game) => {
      dispatch(searchLoadingAction(true))
      dispatch(getByName(game))
      setName('')
  }

  const eventEnter=(e)=>{
    if(e.key == "Enter"){
        //setName(e.target.value)
        handleClick(name)
        setName('')
    }
    }


  return (

    <div style={{ display: "flex", justifyContent:"end", marginRight:"20px"}}>
      
            <Autosuggest 
            suggestions={gamesFiltered}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={eventEnter}
            
            />
            <Button
          variant="dark" style={{marginLeft:"15rem"}} onClick={()=>handleClick(name)}>Search</Button>
          
        </div>

        );
      }
      