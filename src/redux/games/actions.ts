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

import {
  GetGameRequest,
  GetLeagueGameRequest,
  GetLeagueGameSuccess,
  GetGameSuccess,
  GetIpAddressRequest,
} from "./types";

export const getIpAddress = () => ({
  type: GET_IP_ADDRESS,
});

export const getIpAddressSuccess = (payload: GetIpAddressRequest) => ({
  type: GET_IP_ADDRESS_SUCCESS,
  payload,
});

export const getIpAddressError = (payload: unknown) => ({
  type: GET_IP_ADDRESS_ERROR,
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
