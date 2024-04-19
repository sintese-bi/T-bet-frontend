import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  GET_GAME,
  GET_GAME_RATE,
  GET_IP_ADDRESS,
  GET_LEAGUE_GAME,
  getGameError,
  getGameRateError,
  getGameRateSuccess,
  getGameSuccess,
  getIpAddressError,
  getIpAddressSuccess,
  getLeagueGameError,
  getLeagueGameSuccess,
} from "../actions";
import {
  GetGameRateRequest,
  GetGameRateSuccess,
  GetGameRequest,
  GetGameSuccess,
  GetLeagueGameRequest,
} from "./types";
import { api } from "../../services";
import { Notify } from "../../utils";
import axios from "axios";
import { API_ROUTE } from "../../constants";

function* fetchIpAddress(): Generator {
  try {
    const response = yield call(axios.get, API_ROUTE.IP_ADDRESS);

    const { data } = response as { data: string };

    yield put(getIpAddressSuccess({ ip: data }));
  } catch (error) {
    console.error(error);
    yield put(getIpAddressError({ error }));
  }
}

type GetLeagueGameProps = {
  type: string;
  payload: GetLeagueGameRequest;
};

function* fetchLeagueGames({ payload }: GetLeagueGameProps): Generator {
  const { leagueId } = payload;

  try {
    const response = yield call(
      api.get,
      API_ROUTE.GET_LEAGUE_GAME.replace("leagueId", leagueId)
    );
    const {
      data: { games },
    } = response as { data: { games: string[] } };
    yield put(getLeagueGameSuccess({ games }));
  } catch (error) {
    console.error(error);
    yield put(getLeagueGameError({ error }));
  }
}

type GetGameProps = {
  type: string;
  payload: GetGameRequest;
};

function* fetchGame({ payload }: GetGameProps): Generator {
  const { leagueId, game } = payload;

  try {
    const response = yield call(api.post, API_ROUTE.GET_GAME, {
      liga: leagueId,
      game,
    });

    const { data } = response as { data: GetGameSuccess };

    yield put(getGameSuccess({ ...data }));
  } catch (error) {
    console.error(error);
    yield put(getGameError({ error }));
    Notify({ message: "Erro ao recuperar dados do jogo!", type: "error" });
  }
}

type GetGameRateProps = {
  type: string;
  payload: GetGameRateRequest;
};

function* fetchGameRate({ payload }: GetGameRateProps): Generator {
  const { liga, game } = payload;

  try {
    const response = yield call(api.post, API_ROUTE.GET_GAME_RATE, {
      liga,
      game,
    });
    const { data } = response as { data: GetGameRateSuccess };

    yield put(getGameRateSuccess({ ...data }));
  } catch (error) {
    console.error(error);
    yield put(getGameRateError({ error }));
    Notify({ message: "Erro ao recuperar dados do jogo!", type: "error" });
  }
}

function* watchGetAuth() {
  yield takeLatest(GET_IP_ADDRESS, fetchIpAddress);
  yield takeLatest(GET_LEAGUE_GAME, fetchLeagueGames);
  yield takeEvery(GET_GAME, fetchGame);
  yield takeEvery(GET_GAME_RATE, fetchGameRate);
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)]);
}
