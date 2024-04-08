import { all } from "redux-saga/effects";
import gameSaga from "./games/saga";

export default function* rootSaga() {
  yield all([gameSaga()]);
}
