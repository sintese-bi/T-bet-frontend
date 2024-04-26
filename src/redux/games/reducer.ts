import { Reducer } from "redux";
import {
  GetGameRateRequest,
  GetGameRateSuccess,
  GetGameRequest,
  GetGameSuccess,
  GetIpAddressSuccess,
  GetLeagueGameRequest,
  GetLeagueGameSuccess,
} from "./types";
import {
  GET_GAME,
  GET_GAME_ERROR,
  GET_GAME_RATE,
  GET_GAME_RATE_ERROR,
  GET_GAME_RATE_SUCCESS,
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
  gameRate: GetGameRateSuccess;
  isGameRateLoading: boolean;
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
    | GetIpAddressSuccess
    | GetGameRateRequest
    | GetGameRateSuccess;
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
  gameRate: {
    home: {
      loss: Math.min(),
      win: Math.min(),
      rate: Math.min(),
    },
    over25: {
      loss: Math.min(),
      win: Math.min(),
      rate: Math.min(),
    },
    under25: {
      loss: Math.min(),
      win: Math.min(),
      rate: Math.min(),
    },
    over35: {
      loss: Math.min(),
      win: Math.min(),
      rate: Math.min(),
    },
    vis: {
      loss: Math.min(),
      win: Math.min(),
      rate: Math.min(),
    },
    ambasMarcam: {
      loss: Math.min(),
      win: Math.min(),
      rate: Math.min(),
    },
  },
  isGameRateLoading: false,
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
    case GET_IP_ADDRESS_SUCCESS: {
      const payload = action.payload as GetIpAddressSuccess;
      return {
        ...state,
        isIpAddressLoading: false,
        user: payload.ip,
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

    case GET_GAME_SUCCESS: {
      const payload = action.payload as GetGameSuccess;
      return {
        ...state,
        game: { ...payload },
        isLoadingGames: false,
      };
    }

    case GET_GAME_RATE_SUCCESS: {
      const payload = action.payload as GetGameRateSuccess;
      return {
        ...state,
        gameRate: { ...payload },
        isGameRateLoading: false,
      };
    }

    case GET_GAME_RATE: {
      return {
        ...state,
        isGameRateLoading: true,
      };
    }

    case GET_LEAGUE_GAME: {
      return {
        ...state,
        isLoadingLeagueGames: true,
      };
    }

    case GET_GAME: {
      return {
        ...state,
        isLoadingGames: true,
      };
    }

    case GET_IP_ADDRESS: {
      return {
        ...state,
        isIpAddressLoading: true,
      };
    }

    case GET_LEAGUE_GAME: {
      return {
        ...state,
        isLoadingLeagueGames: true,
      };
    }

    case GET_GAME_RATE_ERROR: {
      return {
        ...state,
        isGameRateLoading: false,
        error: action.payload,
      };
    }

    case GET_LEAGUE_GAME_ERROR: {
      return {
        ...state,
        isLoadingLeagueGames: false,
        error: action.payload,
      };
    }

    case GET_GAME_ERROR: {
      return {
        ...state,
        isLoadingGames: false,
        error: action.payload,
      };
    }

    case GET_IP_ADDRESS_ERROR: {
      return {
        ...state,
        isIpAddressLoading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
