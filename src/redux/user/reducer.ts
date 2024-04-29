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
  error: any;
};

const initialState = {
  user: {
    id: "",
    credits: 0,
    token: "",
    email: "",
  },
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
      const { user } = action.payload as GetUserSuccess;
      return {
        ...state,
        user: { ...state.user, ...user },
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
      const { user } = action.payload as LoginUserSuccess;
      return {
        ...state,
        user: user,
        isUserLoading: false,
      };
    }

    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isUserLoading: false,
      };
    }

    case RESET_PASSWORD_LINK_SUCCESS: {
      return {
        ...state,
        isUserLoading: false,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isUserLoading: false,
      };
    }

    case BUY_CREDITS_SUCCESS: {
      return {
        ...state,
      };
    }

    case BUY_CREDITS: {
      return {
        ...state,
      };
    }

    case UPDATE_USER: {
      return {
        ...state,
      };
    }

    case LOGIN_USER: {
      return {
        ...state,
        isUserLoading: true,
      };
    }

    case REGISTER_USER: {
      return {
        ...state,
        isUserLoading: true,
      };
    }

    case GET_USER: {
      return {
        ...state,
        isUserLoading: true,
      };
    }

    case LOGGOUT_USER: {
      return {
        ...state,
        isUserLoading: true,
      };
    }

    case RESET_PASSWORD: {
      return {
        ...state,
        isUserLoading: true,
      };
    }

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
