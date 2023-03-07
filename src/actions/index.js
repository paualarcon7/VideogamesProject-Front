import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_GENRE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_BY_NAME,
  POST_VIDEOGAME,
  GET_DETAILS,
  CLEAN_DETAILS,
  LOADING_ACTION 
} from "../actionTypes";

export function loadingAction(payload) {
  return {
    type: LOADING_ACTION,
    payload,
  };
}

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    }), 
    dispatch(loadingAction(false))
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: json.data,
    });
  };
}

export function filterGenre(payload) {
  return {
    type: FILTER_GENRE,
    payload,
  }
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  }
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload,
  }
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: json.data,
      }), dispatch(loadingAction(false))
    } catch (error) {
      alert("We couldn't find the specified game :(")
    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
        var data = await axios.post("http://localhost:3001/videogames", payload);
    console.log("data: ", data);
    console.log("soy el payload: ", payload);
    return dispatch({
      type: POST_VIDEOGAME,
      payload: data,
    }), dispatch(loadingAction(false)), alert("Game successfully created!")
    
  }catch (error) {
    alert("UPS something went wrong, please complete all fields")
  }
}
}

export function getDetail(id) {
  return async function (dispatch) {
    var data = await axios.get("http://localhost:3001/videogames/" + id);
    return dispatch({
      type: GET_DETAILS,
      payload: data.data,
    }), dispatch(loadingAction(false))
  };
}

export function cleanDetail() {
  return function (dispatch) {
   
    return dispatch({
      type: CLEAN_DETAILS,
    
    });
  };
}



