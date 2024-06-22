import { Navigate } from "react-router-dom";
import { BrowserKeys } from "../../constants";
import { RedirectProps } from "../../utils/route";

export type User = {
  id: string;
  credits: number;
  token: string;
  email: string;
};

export type GetUserRequest = {
  email: string;
};

export type GetUserSuccess = {
  user: Omit<User, "id" | "token">;
  timeLeft: Date;
};

export type RegisterUserRequest = RedirectProps & {
  email: string;
};

export type LoginUserRequest = RedirectProps & {
  email: string;
  password: string;
};

export type LoginUserSuccess = {
  user: User;
  timeLeft: Date;
};

export type UpdateUserRequest = Omit<User, "id" | "token">;

export type LoggoutUserRequest = RedirectProps;

export type ResetPasswordLink = {
  email: string;
};

export type ResetPassword = RedirectProps & {
  email: string;
  token: string;
  password: string;
};
