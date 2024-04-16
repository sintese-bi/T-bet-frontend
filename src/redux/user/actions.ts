import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "../actions";
import { GetUserRequest } from "./types";

export const getUser = (email: GetUserRequest) => ({
  type: GET_USER,
  payload: email,
});

export const getUserSuccess = (payload: any) => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserError = (payload: any) => ({
  type: GET_USER_ERROR,
  payload,
});

export const updateUser = (payload: any) => ({
  type: UPDATE_USER,
  payload,
});

export const updateUserSuccess = (payload: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserError = (payload: any) => ({
  type: UPDATE_USER_ERROR,
  payload,
});

export const loginUser = (payload: any) => ({
  type: LOGIN_USER,
  payload,
});

export const loginUserSuccess = (payload: any) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserError = (payload: any) => ({
  type: LOGIN_USER_ERROR,
  payload,
});

export const registerUser = (payload: any) => ({
  type: REGISTER_USER,
  payload,
});

export const registerUserSuccess = (payload: any) => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserError = (payload: any) => ({
  type: REGISTER_USER_ERROR,
  payload,
});
