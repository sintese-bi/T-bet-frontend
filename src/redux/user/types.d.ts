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
};

export type UpdateUserRequest = Omit<User, "id" | "token">;

export type LoggoutUserRequest = RedirectProps;
