import { Reducer } from "redux";
import {
  GetGameRequest,
  GetGameSuccess,
  GetLeagueGameRequest,
  GetLeagueGameSuccess,
  GetLeagueRequest,
  GetLeagueSuccess,
} from "./types";
import {
  GET_GAME,
  GET_GAME_ERROR,
  GET_GAME_SUCCESS,
  GET_LEAGUE,
  GET_LEAGUE_ERROR,
  GET_LEAGUE_GAME,
  GET_LEAGUE_GAME_ERROR,
  GET_LEAGUE_GAME_SUCCESS,
  GET_LEAGUE_SUCCESS,
} from "../actions";

type GameState = {
  leagues: string[];
  game: GetGameSuccess;
  games: string[];
  gameStats: GetLeagueSuccess;
  isLoadingGameStats: boolean;
  isLoadingLeagues: boolean;
  isLoadingLeagueGames: boolean;
  isLoadingGames: boolean;
  error: any;
};

type GameAction = {
  type: string;
  payload:
    | GetLeagueGameRequest
    | GetLeagueGameSuccess
    | GetGameRequest
    | GetLeagueRequest
    | GetLeagueSuccess;
};

const initialState: GameState = {
  leagues: [],
  game: {
    home: "",
    over25: "",
    over35: "",
    under25: "",
    vis: "",
    tableData: [],
  },
  games: [],
  gameStats: {
    home: "",
    over25: "",
    over35: "",
    under25: "",
    vis: "",
  },
  isLoadingGameStats: false,
  isLoadingLeagues: false,
  isLoadingLeagueGames: false,
  isLoadingGames: false,
  error: null,
};

const AuthReducer: Reducer<GameState, GameAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_LEAGUE: {
      return {
        ...state,
        isLoadingGameStats: true,
      };
    }

    case GET_LEAGUE_SUCCESS: {
      const payload = action.payload as GetLeagueSuccess;
      return {
        ...state,
        gameStats: { ...payload },
        isLoadingGameStats: false,
      };
    }

    case GET_LEAGUE_ERROR: {
      return {
        ...state,
        isLoadingGameStats: false,
        error: action.payload,
      };
    }

    case GET_LEAGUE_GAME: {
      return {
        ...state,
        isLoadingLeagueGames: true,
      };
    }

    case GET_LEAGUE_GAME_SUCCESS: {
      const payload = action.payload as GetLeagueGameSuccess;
      return {
        ...state,
        games: [...payload.games],
        isLoadingLeagueGames: false,
      };
    }

    case GET_LEAGUE_GAME_ERROR: {
      return {
        ...state,
        isLoadingLeagueGames: false,
        error: action.payload,
      };
    }

    case GET_GAME: {
      return {
        ...state,
        isLoadingGames: true,
      };
    }

    case GET_GAME_SUCCESS: {
      const payload = action.payload as GetGameSuccess;
      return {
        ...state,
        game: { ...payload },
        isLoadingGames: false,
      };
    }

    case GET_GAME_ERROR: {
      return {
        ...state,
        isLoadingGames: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
