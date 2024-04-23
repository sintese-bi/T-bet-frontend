import {
  BUY_CREDITS,
  BUY_CREDITS_ERROR,
  BUY_CREDITS_SUCCESS,
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  LOGGOUT_USER,
  LOGGOUT_USER_ERROR,
  LOGGOUT_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_LINK,
  RESET_PASSWORD_LINK_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "../actions";
import {
  GetUserRequest,
  GetUserSuccess,
  LoggoutUserRequest,
  LoginUserRequest,
  LoginUserSuccess,
  RegisterUserRequest,
  ResetPassword,
  ResetPasswordLink,
  UpdateUserRequest,
} from "./types";

export const getUser = (payload: GetUserRequest) => ({
  type: GET_USER,
  payload,
});

export const getUserSuccess = (payload: GetUserSuccess) => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserError = (payload: any) => ({
  type: GET_USER_ERROR,
  payload,
});

export const updateUser = (payload: UpdateUserRequest) => ({
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

export const loginUser = (payload: LoginUserRequest) => ({
  type: LOGIN_USER,
  payload,
});

export const loginUserSuccess = (payload: LoginUserSuccess) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserError = (payload: any) => ({
  type: LOGIN_USER_ERROR,
  payload,
});

export const registerUser = (payload: RegisterUserRequest) => ({
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

export const loggoutUser = (payload: LoggoutUserRequest) => ({
  type: LOGGOUT_USER,
  payload,
});

export const loggoutUserSuccess = (payload: any) => ({
  type: LOGGOUT_USER_SUCCESS,
  payload,
});

export const loggoutUserError = (payload: any) => ({
  type: LOGGOUT_USER_ERROR,
  payload,
});

export const buyCredits = () => ({
  type: BUY_CREDITS,
});

export const buyCreditsSuccess = () => ({
  type: BUY_CREDITS_SUCCESS,
});

export const buyCreditsError = () => ({
  type: BUY_CREDITS_ERROR,
});

export const resetPasswordLink = (payload: ResetPasswordLink) => ({
  type: RESET_PASSWORD_LINK,
  payload,
});

export const resetPasswordLinkSuccess = () => ({
  type: RESET_PASSWORD_LINK_SUCCESS,
});

export const resetPassword = (payload: ResetPassword) => ({
  type: RESET_PASSWORD,
  payload,
});

export const resetPasswordLinkError = () => ({
  type: RESET_PASSWORD_ERROR,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordError = () => ({
  type: RESET_PASSWORD_ERROR,
});
