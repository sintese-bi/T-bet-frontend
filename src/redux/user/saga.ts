import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GetUserRequest } from "./types";
import { GET_USER, LOGIN_USER, REGISTER_USER, UPDATE_USER } from "../actions";
import { getUserError, getUserSuccess } from "./actions";
import axios from "axios";
import { API_ROUTE } from "../../constants";

type GetUserCallProps = {
  type: string;
  payload: GetUserRequest;
};

function* getUserCall(action: GetUserCallProps): Generator {
  try {
    const user = yield call(axios.post, API_ROUTE.GET_USER, action.payload);
    yield put(getUserSuccess(user));
  } catch (e) {
    yield put(getUserError(e));
  }
}

type RegisterUserCallProps = {
  type: string;
  payload: any;
};

function* registerUserCall(action: RegisterUserCallProps): Generator {
  try {
    const user = yield call(
      axios.post,
      API_ROUTE.REGISTER_USER,
      action.payload
    );
    yield put(getUserSuccess(user));
  } catch (e) {
    yield put(getUserError(e));
  }
}

type UpdateUserCallProps = {
  type: string;
  payload: any;
};

function* updateUserCall(action: UpdateUserCallProps): Generator {
  try {
    const user = yield call(axios.post, API_ROUTE.UPDATE_USER, action.payload);
    yield put(getUserSuccess(user));
  } catch (e) {
    yield put(getUserError(e));
  }
}

type LoginUserCallProps = {
  type: string;
  payload: any;
};

function* loginUserCall(action: LoginUserCallProps): Generator {
  try {
    const user = yield call(axios.post, API_ROUTE.LOGIN_USER, action.payload);
    yield put(getUserSuccess(user));
  } catch (e) {
    yield put(getUserError(e));
  }
}

function* watchGetAuth() {
  yield takeEvery(GET_USER, getUserCall);
  yield takeEvery(LOGIN_USER, loginUserCall);
  yield takeEvery(UPDATE_USER, updateUserCall);
  yield takeEvery(REGISTER_USER, registerUserCall);
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)]);
}
