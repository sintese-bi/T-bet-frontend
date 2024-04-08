import React, { useEffect, useState } from "react";
import { Select, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { RingLoader } from "react-spinners";
import { getGame, getLeague, getLeagueGame } from "../../../redux/actions";
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
    }
  }, [selectedGame, dispatch]);

  useEffect(() => {
    dispatch(getLeague({ id: selectedLeague }));
    dispatch(getLeagueGame({ leagueId: selectedLeague }));
  }, [dispatch, selectedLeague]);

  return (
    <form className="max-w-7xl w-full m-auto mt-5 flex flex-col gap-10">
      {/* CREDIT */}
      <section className="bg-[#232323] text-green-400 rounded-lg flex flex-wrap justify-center items-center p-4 gap-5 lg:gap-0 lg:justify-between ">
        <div className="flex gap-4">
          <p>QUANTIDADE DE PESQUISAS GRATUITAS</p>
          <p>0/3</p>
        </div>
        <button className="bg-red-500 p-2 rounded-md text-white ">
          Comprar créditos
        </button>
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
                data={Object.values(LEAGUE).map((league) => league)}
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
              />
            )}
          />
        </div>
      </section>

      {/* GAME INFO */}
      {isLoadingGames ? (
        <section
          className={`max-w-lg w-full m-auto bg-[#232323] p-8 rounded-2xl gap-14 `}
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
            <section className={`max-w-lg w-full grad p-8 rounded-2xl`}>
              {/* GAME STATS */}
              <div className="flex flex-wrap gap-2 justify-center ">
                {orderedStatsKeys.map((key: HighestStatKey) =>
                  highestStatKey === key ? (
                    <div key={key} className={``}>
                      <Text>
                        Modalidade: <b>{formatGameStatsLabel(key)}</b>
                      </Text>

                      <Text>
                        Acurácia: <b>{formatGameStatsPorcentage(game[key])}</b>
                      </Text>
                    </div>
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
