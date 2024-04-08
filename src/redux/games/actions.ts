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

import {
  GetGameRequest,
  GetLeagueRequest,
  GetLeagueGameRequest,
  GetLeagueSuccess,
  GetLeagueGameSuccess,
  GetGameSuccess,
} from "./types";

export const getLeague = (payload: GetLeagueRequest) => {
  return {
    type: GET_LEAGUE,
    payload,
  };
};

export const getLeagueSuccess = (payload: GetLeagueSuccess) => ({
  type: GET_LEAGUE_SUCCESS,
  payload,
});

export const getLeagueError = (payload: unknown) => ({
  type: GET_LEAGUE_ERROR,
  payload,
});

export const getLeagueGame = (payload: GetLeagueGameRequest) => {
  return {
    type: GET_LEAGUE_GAME,
    payload,
  };
};

export const getLeagueGameSuccess = (payload: GetLeagueGameSuccess) => ({
  type: GET_LEAGUE_GAME_SUCCESS,
  payload,
});

export const getLeagueGameError = (payload: unknown) => ({
  type: GET_LEAGUE_GAME_ERROR,
  payload,
});

export const getGame = (payload: GetGameRequest) => ({
  type: GET_GAME,
  payload,
});

export const getGameSuccess = (payload: GetGameSuccess) => ({
  type: GET_GAME_SUCCESS,
  payload,
});

export const getGameError = (payload: unknown) => ({
  type: GET_GAME_ERROR,
  payload,
});
