import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import {
  GetUserRequest,
  LoggoutUserRequest,
  LoginUserRequest,
  RegisterUserRequest,
  ResetPassword,
  ResetPasswordLink,
  UpdateUserRequest,
} from "./types";
import {
  GET_USER,
  LOGGOUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD,
  RESET_PASSWORD_LINK,
  UPDATE_USER,
} from "../actions";
import {
  getUserError,
  getUserSuccess,
  loginUserSuccess,
  registerUserError,
  registerUserSuccess,
  resetPasswordError,
  resetPasswordLinkError,
  resetPasswordLinkSuccess,
  resetPasswordSuccess,
  updateUserError,
  updateUserSuccess,
} from "./actions";
import { API_ROUTE, BROWSER_ROUTE } from "../../constants";
import { userApi } from "../../services/userApi";
import { Notify } from "../../utils";

function* getUserCall(): Generator {
  const email = localStorage.getItem("email@TBet");
  try {
    const user = yield call(
      userApi.post,
      API_ROUTE.GET_USER,
      {
        use_email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token@TBet")}`,
        },
      }
    );
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

    yield put(getUserError(error.message));
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
    Notify({
      message: "Senha enviada para o seu e-mail, verifique sua caixa de spam",
      type: "success",
    });
  } catch (e) {
    const {
      response: {
        data: { message },
      },
    } = e as { response: { data: { message: string } } };
    console.error(e);
    yield put(registerUserError(message));
  }
}

type UpdateUserCallProps = {
  type: string;
  payload: UpdateUserRequest;
};

function* updateUserCall(action: UpdateUserCallProps): Generator {
  const { email, credits } = action.payload;
  try {
    const user = yield call(
      userApi.put,
      API_ROUTE.UPDATE_USER,
      {
        use_email: email,
        use_quant: credits,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token@TBet")}`,
        },
      }
    );

    yield put(updateUserSuccess(user));
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(updateUserError(error.message));
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
      data: { use_id, use_quant, acesso, sub_expired },
    } = user as {
      data: {
        use_id: string;
        use_quant: number;
        acesso: string;
        sub_expired: number;
      };
    };

    const isExpired = sub_expired === 1;

    navigate(BROWSER_ROUTE.HOME);

    localStorage.setItem("token@TBet", acesso);
    localStorage.setItem("email@TBet", email);
    localStorage.setItem("expired@TBet", String(isExpired));

    yield put(
      loginUserSuccess({
        user: { id: use_id, credits: use_quant, token: acesso, email },
      })
    );
  } catch (e) {
    const error = e as Error;
    console.error(error);
    Notify({ message: "Email ou senha inválida", type: "error" });
    yield put(getUserError(error.message));
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
    localStorage.removeItem("email@TBet");
    localStorage.removeItem("expired@TBet");

    navigate(BROWSER_ROUTE.LOGIN);
    Notify({ message: "Desconectado com sucesso!", type: "success" });
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
  }
}

type ResetPasswordLinkCallProps = {
  type: string;
  payload: ResetPasswordLink;
};

function* resetPasswordLinkCall(action: ResetPasswordLinkCallProps): Generator {
  try {
    yield call(
      userApi.post,
      API_ROUTE.RESET_PASSWORD_LINK,
      {
        use_email: action.payload.email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token@TBet")}`,
        },
      }
    );

    yield put(resetPasswordLinkSuccess());
    Notify({
      message: "Link enviado para o seu e-mail, verifique a caixa de SPAM",
      type: "success",
    });
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(resetPasswordLinkError());
  }
}

type ResetPasswordCallProps = {
  type: string;
  payload: ResetPassword;
};

function* resetPasswordCall(action: ResetPasswordCallProps): Generator {
  const { email, token, password, navigate } = action.payload;

  try {
    yield call(
      userApi.post,
      API_ROUTE.RESET_PASSWORD.replace("{{token}}", token).replace(
        "{{email}}",
        email
      ),
      {
        use_password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token@TBet")}`,
        },
      }
    );
    navigate(BROWSER_ROUTE.LOGIN);
    Notify({ message: "Senha alterada com sucesso!", type: "success" });
    yield put(resetPasswordSuccess());
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(resetPasswordError());
  }
}

function* watchGetAuth() {
  yield takeEvery(GET_USER, getUserCall);
  yield takeEvery(LOGIN_USER, loginUserCall);
  yield takeEvery(UPDATE_USER, updateUserCall);
  yield takeEvery(REGISTER_USER, registerUserCall);
  yield takeEvery(LOGGOUT_USER, loggoutUserCall);
  yield takeEvery(RESET_PASSWORD_LINK, resetPasswordLinkCall);
  yield takeEvery(RESET_PASSWORD, resetPasswordCall);
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)]);
}
