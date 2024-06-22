import { Reducer } from "redux";
import {
  GetUserRequest,
  GetUserSuccess,
  LoggoutUserRequest,
  LoginUserRequest,
  LoginUserSuccess,
  RegisterUserRequest,
  UpdateUserRequest,
  User,
} from "./types";
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
  RESET_PASSWORD_LINK_ERROR,
  RESET_PASSWORD_LINK_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "../actions";
import { timeLog } from "console";

type UserAction = {
  type: string;
  payload:
    | RegisterUserRequest
    | GetUserRequest
    | GetUserSuccess
    | LoginUserRequest
    | LoginUserSuccess
    | LoggoutUserRequest
    | LoginUserSuccess
    | UpdateUserRequest
    | any;
};

type UserState = {
  user: User;
  isUserLoading: boolean;
  timeLeft: Date;
  error: any;
};

const initialState = {
  user: {
    id: "",
    credits: 0,
    token: "",
    email: "",
  },
  timeLeft: new Date(),
  isUserLoading: false,
  error: null,
};

const UserReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: initialState.user,
        isUserLoading: false,
      };
    }

    case GET_USER_SUCCESS: {
      const { user, timeLeft } = action.payload as GetUserSuccess;
      return {
        ...state,
        user: { ...state.user, ...user },
        timeLeft,
        isUserLoading: false,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, credits: state.user.credits - 1 },
      };
    }

    case LOGIN_USER_SUCCESS: {
      const { user, timeLeft } = action.payload as LoginUserSuccess;
      return {
        ...state,
        user: user,
        timeLeft,
        isUserLoading: false,
      };
    }

    case REGISTER_USER_SUCCESS:
    case RESET_PASSWORD_LINK_SUCCESS:
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isUserLoading: false,
      };
    }

    case BUY_CREDITS_SUCCESS:
    case BUY_CREDITS:
    case UPDATE_USER: {
      return {
        ...state,
      };
    }

    case LOGIN_USER:
    case REGISTER_USER:
    case GET_USER:
    case LOGGOUT_USER:
    case RESET_PASSWORD:
    case RESET_PASSWORD_LINK: {
      return {
        ...state,
        isUserLoading: true,
      };
    }

    case RESET_PASSWORD_ERROR:
    case RESET_PASSWORD_LINK_ERROR:
    case BUY_CREDITS_ERROR:
    case LOGGOUT_USER_ERROR:
    case GET_USER_ERROR:
    case REGISTER_USER_ERROR:
    case LOGIN_USER_ERROR:
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isUserLoading: false,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
