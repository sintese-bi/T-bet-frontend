import React, { useEffect, useState } from "react";
import { Button, Select } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getGame, getLeagueGame } from "../../../redux/actions";
import { DefaultState } from "../../../redux/reducers";
import { BROWSER_ROUTE, LEAGUE } from "../../../constants";
import { Notify } from "../../../utils";

import Confetti from "react-confetti";
import { useGetWindow } from "../../../hooks/useGetWindow";
import { getUser, updateUser } from "../../../redux/user/actions";
import DisplayGame from "./components/DisplayGame";
import { RingLoader } from "react-spinners";
import { useSessionCheck } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isUserLoading } = useSelector(
    (state: DefaultState) => state.auth
  );
  const { games, isLoadingGames } = useSelector(
    (state: DefaultState) => state.games
  );
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      league: LEAGUE.EURO,
      game: "",
    },
  });

  const [accuracyLoadingProgress, setAccuracyLoadingProgress] = useState(0);
  const [dispatchedGame, setDispatchedGame] = useState("");
  const customWindow = useGetWindow();

  const selectedLeague = watch("league");
  const selectedGame = watch("game");

  const handleHasReachedLimit = () => user.credits === 0;
  const handleResetDispatchedGame = () => setDispatchedGame("");
  const onSubmit = () => {
    if (handleHasReachedLimit()) {
      Notify({
        message: "Você atingiu o limite de consultas.",
        type: "error",
      });
      return;
    }
    dispatch(getGame({ leagueId: selectedLeague, game: selectedGame }));
    setAccuracyLoadingProgress(0);
    dispatch(updateUser({ email: user.email, credits: user.credits - 1 }));
    setDispatchedGame(selectedGame);
  };

  // SELECT LEAGUE EFFECT
  useEffect(() => {
    dispatch(getLeagueGame({ leagueId: selectedLeague }));
  }, [dispatch, selectedLeague]);

  // GET USER EFFECT
  useEffect(() => {
    if (isUserLoading) return;
    dispatch(getUser({ email: user.email }));
  }, [dispatch]);

  const isUserAuthenticated = useSessionCheck();

  useEffect(() => {
    console.log(!isUserAuthenticated);
    if (!isUserAuthenticated) {
      navigate(BROWSER_ROUTE.LOGIN);
      return;
    }
  }, [isUserAuthenticated, navigate]);

  return isUserLoading ? (
    <section className="flex justify-center items-center h-full">
      <RingLoader color="#ffbf69" />
    </section>
  ) : (
    <form className="max-w-7xl w-full m-auto mt-5 flex flex-col gap-10">
      <Confetti
        recycle={false}
        width={customWindow.width}
        height={customWindow.height}
      />

      {/* CREDIT */}
      <section className="text-white rounded-2xl flex flex-wrap justify-center items-center p-4 gap-5 lg:gap-0 lg:justify-between border-2 border-yellow-400">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex gap-4">
            <p>CRÉDITOS:</p>
            <p>{user.credits}</p>
          </div>
          <a
            target="_blank"
            href="https://buy.stripe.com/7sIbMl6Jx8T28Rq9Bo"
            className="bg-green-500 p-2 rounded-md text-white text-center"
          >
            Comprar créditos
          </a>
        </div>
        <div>
          R$ 1,00 por crédito. Cada crédito lhe dá 1 opção de consulta aos
          jogos. Ao selecionar o jogo de interesse sera computado o uso de 1
          credito. Você pode comprar quantos créditos quiser, basta clicar no
          botão acima comprar créditos.
        </div>
      </section>

      {/* SELECTORS */}
      <form className="flex flex-wrap items-end justify-center gap-10 md:gap-52 lg:flex-nowrap border-2 border-yellow-400 rounded-2xl p-4">
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
                onChange={(value) => {
                  if (handleHasReachedLimit()) {
                    Notify({
                      message: "Você atingiu o limite de consultas.",
                      type: "error",
                    });
                    return;
                  }
                  handleResetDispatchedGame();
                  field.onChange(value);
                }}
                nothingFoundMessage="O nome dos times deve ser igual a como aparece na bet."
                searchable
                disabled={isLoadingGames || handleHasReachedLimit()}
              />
            )}
          />
        </div>
        {selectedGame && (
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            bg={"green"}
            className="w-full bg-green-400 lg:justify-center"
          >
            Pesquisar
          </Button>
        )}
      </form>

      {/* GAME INFO */}
      <DisplayGame
        selectedGame={dispatchedGame}
        accuracyLoadingProgress={accuracyLoadingProgress}
        setAccuracyLoadingProgress={setAccuracyLoadingProgress}
      />
    </form>
  );
};

export default HomePage;
