import { all } from "redux-saga/effects";
import gameSaga from "./games/saga";
import userSaga from "./user/saga";

export default function* rootSaga() {
  yield all([gameSaga(), userSaga()]);
}
