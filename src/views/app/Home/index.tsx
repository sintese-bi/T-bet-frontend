import React, { useEffect, useState } from "react";
import { Select, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { RingLoader } from "react-spinners";
import { getGame, getLeagueGame } from "../../../redux/actions";
import { DefaultState } from "../../../redux/reducers";
import { LEAGUE } from "../../../constants";
import {
  HighestStatKey,
  findHighestGameStatWithPreference,
  formatGameStatsLabel,
  formatGameStatsPorcentage,
  orderedStatsKeys,
} from "../../../helpers";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { games, game, isLoadingGames } = useSelector(
    (state: DefaultState) => state.games
  );
  const { control, watch } = useForm({
    defaultValues: {
      league: LEAGUE.EURO,
      game: "",
    },
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [allowLoadingCompletion, setAllowLoadingCompletion] = useState(false);
  const [accuracyLoadingProgress, setAccuracyLoadingProgress] = useState(0);

  const selectedLeague = watch("league");
  const selectedGame = watch("game");
  const highestStatKey: HighestStatKey =
    findHighestGameStatWithPreference(game);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoadingGames || allowLoadingCompletion) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          const nextProgress = prevProgress + 20;
          if (nextProgress >= 100) {
            clearInterval(interval);
            setAllowLoadingCompletion(false);
            return 100;
          }
          return nextProgress;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isLoadingGames, allowLoadingCompletion]);

  useEffect(() => {
    if (!isLoadingGames && loadingProgress < 100) {
      setAllowLoadingCompletion(true);
    }
  }, [isLoadingGames, loadingProgress]);

  useEffect(() => {
    if (selectedGame) {
      dispatch(getGame({ leagueId: selectedLeague, game: selectedGame }));
      setAccuracyLoadingProgress(0);
    }
  }, [selectedGame, dispatch]);

  useEffect(() => {
    dispatch(getLeagueGame({ leagueId: selectedLeague }));
  }, [dispatch, selectedLeague]);

  useEffect(() => {
    if (!isLoadingGames && selectedGame) {
      const targetProgress = parseInt(
        formatGameStatsPorcentage(game[highestStatKey]),
        10
      );
      const interval = setInterval(() => {
        setAccuracyLoadingProgress((prevProgress) => {
          if (prevProgress >= targetProgress) {
            clearInterval(interval);
            return targetProgress;
          }
          return prevProgress + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoadingGames, selectedGame, game, highestStatKey]);

  return (
    <form className="max-w-7xl w-full m-auto mt-5 flex flex-col gap-10">
      {/* CREDIT */}
      <section className="text-white rounded-lg flex flex-wrap justify-center items-center p-4 gap-5 lg:gap-0 lg:justify-between ">
        <div className="flex gap-4">
          <p>QUANTIDADE DE PESQUISAS GRATUITAS</p>
          <p>0/3</p>
        </div>
        <a
          target="_blank"
          href="https://buy.stripe.com/7sIbMl6Jx8T28Rq9Bo"
          className="bg-green-400 p-2 rounded-md text-white "
        >
          Comprar créditos
        </a>
      </section>

      {/* SELECTORS */}
      <section className="flex flex-wrap justify-center gap-10 md:gap-52 lg:flex-nowrap">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center lg:text-left">
            Selecione a liga
          </h1>
          <Controller
            name="league"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Selecionar liga"
                // data={Object.values(LEAGUE).map((league) => league)}
                data={[LEAGUE.EURO]}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center lg:text-left">
            Selecione o jogo
          </h1>
          <Controller
            name="game"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Selecionar jogo"
                data={games.map((game) => game)}
                onChange={(value) => field.onChange(value)}
                nothingFoundMessage="O nome dos times deve ser igual a como aparece na bet."
                searchable
              />
            )}
          />
        </div>
      </section>

      {/* GAME INFO */}
      {isLoadingGames ? (
        <section
          className={`max-w-lg w-full m-auto bg-[#232323] p-8 rounded-2xl gap-14 self-center`}
        >
          <div className="self-center flex flex-col items-center">
            <RingLoader color="#ffbf69" />
            <Text size="lg" style={{ marginTop: 10 }}>
              Analisando dados do jogo... {loadingProgress}%
            </Text>
          </div>
        </section>
      ) : (
        <>
          {selectedGame && (
            <section className={`max-w-lg w-full p-8 rounded-2xl self-center`}>
              {/* GAME STATS */}
              <div className="flex flex-col flex-wrap gap-5 items-center ">
                {orderedStatsKeys.map((key: HighestStatKey) =>
                  highestStatKey === key ? (
                    <>
                      <div className="flex flex-col items-center">
                        <Text className="text-2xl">Mercado</Text>
                        <Text className="text-green-400">
                          <b>{formatGameStatsLabel(key)}</b>
                        </Text>
                      </div>

                      <div className="flex flex-col w-full items-center">
                        <Text className="text-2xl">Acurácia</Text>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-green-400 h-2.5 rounded-full"
                            style={{ width: `${accuracyLoadingProgress}%` }}
                          ></div>
                        </div>
                        <Text>
                          <b>{accuracyLoadingProgress}%</b>
                        </Text>
                      </div>
                    </>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </section>
          )}
        </>
      )}
    </form>
  );
};

export default HomePage;
