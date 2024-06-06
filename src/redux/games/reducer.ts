import { Reducer } from "redux";
import { GetNextGamesSuccess } from "./types";
import {
  GET_NEXT_GAMES,
  GET_NEXT_GAMES_ERROR,
  GET_NEXT_GAMES_SUCCESS,
} from "../actions";

type GameState = {
  games: GetNextGamesSuccess[];
  isLoading: boolean;
  error: any;
};

type GameAction = {
  type: string;
  payload: GetNextGamesSuccess[];
};

const initialState: GameState = {
  games: [],
  isLoading: false,
  error: null,
};

const AuthReducer: Reducer<GameState, GameAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_NEXT_GAMES_SUCCESS: {
      return {
        ...state,
        games: action.payload,
        isLoading: false,
      };
    }

    case GET_NEXT_GAMES_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case GET_NEXT_GAMES:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default AuthReducer;
