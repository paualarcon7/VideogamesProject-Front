
import {
  GET_GENRES,
  GET_VIDEOGAMES,
  FILTER_GENRE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_BY_NAME,
  GET_DETAILS,
  POST_VIDEOGAME,
  CLEAN_DETAILS,
  LOADING_ACTION,
} from "../actionTypes";

const initialState = {
  backup: [], //estado backup con todos los juegos
  videogames: [], //estado que se va a ir modif en base al FILTRADO
  allVideogames: [], //estado que SIEMPRE va a tener todos los juegos
  genres: [],
  detail: [],
  showLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTION:
      return {
        ...state,
        showLoading: action.payload,
      };
    case GET_VIDEOGAMES:
      return {
        ...state,
        backup: action.payload,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        }),
      };
    case FILTER_GENRE:
      const allVideogames = state.backup;
      const filtered = [];

      allVideogames.forEach((game) => {
        game.genres.forEach((genre) => {
          if (genre.name === action.payload) filtered.push(game);
        });
      });

      return {
        ...state,
        videogames: filtered,
      };
    case FILTER_CREATED:
      const allGames = state.backup;
      const createdFilter =
        action.payload === "Created by you"
          ? allGames.filter((g) => g.createdDb)
          : allGames.filter((g) => !g.createdDb);

      return {
        ...state,
        videogames: createdFilter,
      };
    case ORDER_BY_NAME:
      const sorted =
        action.payload === "Ascendent A-Z"
          ? [...state.videogames].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : [...state.videogames].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sorted,
      };
    case ORDER_BY_RATING:
      const ratingSorted =
        action.payload === "Highest rating"
          ? [...state.videogames].sort(function (a, b) {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            })
          : [...state.videogames].sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            });
            return {
              ...state,
              videogames: ratingSorted,
            };

    case GET_BY_NAME:
      return {
        ...state,
        videogames: action.payload
      }
    case POST_VIDEOGAME:
      return {
        ...state,
      }
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
        
      }
      case CLEAN_DETAILS:
        return {
          ...state,
          detail: [],
          
        } 

    default:
      return state;
  }
}
