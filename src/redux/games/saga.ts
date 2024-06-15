import { all, call, fork, put, takeLeading } from "redux-saga/effects";
import {
  GET_NEXT_GAMES,
  getNextGamesError,
  getNextGamesSuccess,
} from "../actions";
import { gameAPI } from "../../services/api";
import { GetNextGamesSuccess, NextGamesApiResponse } from "./types";
import { API_ROUTE } from "../../constants";

function* getNextGames(): Generator {
  try {
    const getNextGamesAPI = () => gameAPI.get(API_ROUTE.GET_NEXT_GAMES);

    const response = yield call(getNextGamesAPI);

    const { data } = response as { data: NextGamesApiResponse };

    const getGaleIndex = (gale: string) => {
      const galeIndex = {
        home: "galeHome",
        vis: "galeVis",
        under25: "galeUnder",
        over25: "galeOver",
        over35: "galeOver",
        ambasMarcam: "galeAmbas",
      };

      return galeIndex[gale as keyof typeof galeIndex];
    };

    const formattedData: GetNextGamesSuccess[] = data.nextGames.map(
      (game, index) => ({
        bet: data.bets[index],
        gale: data.gale[getGaleIndex(data.bets[index])] === 1,
        matchTime: data.matchTime[index],
        game,
        odd: data.odds[index],
        rate: data.rate[index],
        isValid: data.rate[index].show === 1,
      })
    );

    yield put(getNextGamesSuccess(formattedData));
  } catch (error) {
    yield put(getNextGamesError());
  }
}

function* watchGetAuth() {
  yield takeLeading(GET_NEXT_GAMES, getNextGames);
}

export default function* rootSaga() {
  yield all([fork(watchGetAuth)]);
}
