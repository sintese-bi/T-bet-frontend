import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GetUserRequest,
  GetUserSuccess,
  LoggoutUserRequest,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  User,
} from "./types";
import {
  GET_USER,
  LOGGOUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
} from "../actions";
import {
  getUserError,
  getUserSuccess,
  loginUserSuccess,
  registerUserError,
  registerUserSuccess,
  updateUserError,
  updateUserSuccess,
} from "./actions";
import { API_ROUTE, BROWSER_ROUTE } from "../../constants";
import { userApi } from "../../services/userApi";
import { Notify } from "../../utils";

type GetUserCallProps = {
  type: string;
  payload: GetUserRequest;
};

function* getUserCall(action: GetUserCallProps): Generator {
  try {
    const user = yield call(userApi.post, API_ROUTE.GET_USER, action.payload);
    const {
      data: {
        message: { use_email, use_quant },
      },
    } = user as { data: { message: { use_email: string; use_quant: number } } };

    yield put(
      getUserSuccess({ user: { email: use_email, credits: use_quant } })
    );
  } catch (e) {
    const error = e as Error;
    console.error(error);

    yield put(getUserError(e));
  }
}

type RegisterUserCallProps = {
  type: string;
  payload: RegisterUserRequest;
};

function* registerUserCall(action: RegisterUserCallProps): Generator {
  const { email, navigate } = action.payload;
  try {
    const user = yield call(userApi.post, API_ROUTE.REGISTER_USER, {
      use_email: email,
    });

    navigate(BROWSER_ROUTE.LOGIN);
    yield put(registerUserSuccess(user));
    Notify({ message: "Usuário criado com sucesso!", type: "success" });
  } catch (e) {
    const error = e as Error;
    console.error(error);

    yield put(registerUserError(error.message));
  }
}

type UpdateUserCallProps = {
  type: string;
  payload: UpdateUserRequest;
};

function* updateUserCall(action: UpdateUserCallProps): Generator {
  const { email, credits } = action.payload;
  try {
    const user = yield call(userApi.put, API_ROUTE.UPDATE_USER, {
      use_email: email,
      use_quant: credits,
    });

    yield put(updateUserSuccess(user));
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(updateUserError(e));
  }
}

type LoginUserCallProps = {
  type: string;
  payload: LoginUserRequest;
};

function* loginUserCall(action: LoginUserCallProps): Generator {
  const { email, password, navigate } = action.payload;
  try {
    const user = yield call(userApi.post, API_ROUTE.LOGIN_USER, {
      use_email: email,
      use_password: password,
    });

    const {
      data: { use_id, use_quant, acesso },
    } = user as { data: { use_id: string; use_quant: number; acesso: string } };

    navigate(BROWSER_ROUTE.HOME);

    localStorage.setItem("token@TBet", acesso);
    yield put(
      loginUserSuccess({
        user: { id: use_id, credits: use_quant, token: acesso, email },
      })
    );
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(getUserError(e));
  }
}

type LoggoutUserCallProps = {
  type: string;
  payload: LoggoutUserRequest;
};

function* loggoutUserCall(action: LoggoutUserCallProps): Generator {
  const { navigate } = action.payload;

  try {
    localStorage.removeItem("token@TBet");

    navigate(BROWSER_ROUTE.LOGIN);
    Notify({ message: "Desconectado com sucesso!", type: "success" });
  } catch (e) {
    const error = e as Error;
    console.error(error);
  }
}

function* watchGetAuth() {
  yield takeEvery(GET_USER, getUserCall);
  yield takeEvery(LOGIN_USER, loginUserCall);
  yield takeEvery(UPDATE_USER, updateUserCall);
  yield takeEvery(REGISTER_USER, registerUserCall);
  yield takeEvery(LOGGOUT_USER, loggoutUserCall);
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)]);
}
