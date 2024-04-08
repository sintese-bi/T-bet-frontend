import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  GET_GAME,
  GET_LEAGUE,
  GET_LEAGUE_GAME,
  getGameError,
  getGameSuccess,
  getLeagueError,
  getLeagueGameError,
  getLeagueGameSuccess,
  getLeagueSuccess,
} from "../actions";
import {
  GetGameRequest,
  GetLeagueGameRequest,
  GetLeagueRequest,
  GetLeagueSuccess,
} from "./types";
import { api } from "../../services";
import { Notify } from "../../utils";

type GetLeagueProps = {
  type: string;
  payload: GetLeagueRequest;
};

function* fetchLeague(action: GetLeagueProps): Generator {
  const { id } = action.payload;
  try {
    const response = yield call(api.get, `infoleague?infoleague=${id}`);

    const { data } = response as { data: GetLeagueSuccess };
    yield put(getLeagueSuccess({ ...data }));
  } catch (error) {
    yield put(getLeagueError({ error }));
  }
}

type GetLeagueGameProps = {
  type: string;
  payload: GetLeagueGameRequest;
};

function* fetchLeagueGames({ payload }: GetLeagueGameProps): Generator {
  const { leagueId } = payload;

  try {
    const response = yield call(api.get, `league?league=${leagueId}`);
    const {
      data: { games },
    } = response as { data: { games: string[] } };
    yield put(getLeagueGameSuccess({ games }));
  } catch (error) {
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
    const response = yield call(api.post, "infogames", {
      liga: leagueId,
      game,
    });

    const { data } = response as { data: GetLeagueSuccess };

    yield put(getGameSuccess({ ...data, tableData: [] }));
    Notify({ message: "Analise feita com sucesso!", type: "success" });
  } catch (error) {
    yield put(getGameError({ error }));
    Notify({ message: "Erro ao recuperar dados do jogo!", type: "error" });
  }
}

function* watchGetAuth() {
  yield takeLatest(GET_LEAGUE, fetchLeague);
  yield takeLatest(GET_LEAGUE_GAME, fetchLeagueGames);
  yield takeEvery(GET_GAME, fetchGame);
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)]);
}
