import { Reducer } from "redux";
import {
  GetGameRequest,
  GetGameSuccess,
  GetIpAddressSuccess,
  GetLeagueGameRequest,
  GetLeagueGameSuccess,
} from "./types";
import {
  GET_GAME,
  GET_GAME_ERROR,
  GET_GAME_SUCCESS,
  GET_IP_ADDRESS,
  GET_IP_ADDRESS_ERROR,
  GET_IP_ADDRESS_SUCCESS,
  GET_LEAGUE_GAME,
  GET_LEAGUE_GAME_ERROR,
  GET_LEAGUE_GAME_SUCCESS,
} from "../actions";

type GameState = {
  user: string;
  leagues: string[];
  game: GetGameSuccess;
  games: string[];
  gameStats: GetGameSuccess;
  isIpAddressLoading: boolean;
  isLoadingGameStats: boolean;
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
    | GetGameSuccess
    | GetIpAddressSuccess;
};

const initialState: GameState = {
  user: "",
  leagues: [],
  game: {
    bet: "",
    prob: 0,
    tableData: [],
  },
  games: [],
  gameStats: {
    bet: "",
    prob: 0,
    tableData: [],
  },
  isIpAddressLoading: false,
  isLoadingGameStats: false,
  isLoadingLeagueGames: false,
  isLoadingGames: false,
  error: null,
};

const AuthReducer: Reducer<GameState, GameAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_IP_ADDRESS: {
      return {
        ...state,
        isIpAddressLoading: true,
      };
    }

    case GET_IP_ADDRESS_SUCCESS: {
      const payload = action.payload as GetIpAddressSuccess;
      return {
        ...state,
        isIpAddressLoading: false,
        user: payload.ip,
      };
    }

    case GET_IP_ADDRESS_ERROR: {
      return {
        ...state,
        isIpAddressLoading: false,
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
