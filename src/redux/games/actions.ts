import { GET_NEXT_GAMES, GET_NEXT_GAMES_SUCCESS } from "../actions";
import { GetNextGamesSuccess } from "./types";

export const getNextGames = () => ({
  type: GET_NEXT_GAMES,
});

export const getNextGamesSuccess = (payload: GetNextGamesSuccess[]) => ({
  type: GET_NEXT_GAMES_SUCCESS,
  payload,
});

export const getNextGamesError = () => ({
  type: GET_NEXT_GAMES,
});
