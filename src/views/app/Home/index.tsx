import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getGame, getGameRate, getLeagueGame } from "../../../redux/actions";
import { DefaultState } from "../../../redux/reducers";
import { LEAGUE } from "../../../constants";
import { Notify } from "../../../utils";

import Confetti from "react-confetti";
import { useGetWindow } from "../../../hooks/useGetWindow";
import { getUser, updateUser } from "../../../redux/user/actions";
import DisplayGame from "./components/DisplayGame";
import { RingLoader } from "react-spinners";
import { formatGameRateStats } from "../../../helpers";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isUserLoading } = useSelector(
    (state: DefaultState) => state.auth
  );
  const { games, isLoadingGames, isGameRateLoading, gameRate, game } =
    useSelector((state: DefaultState) => state.games);

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
  const isLoadingGameRate = isGameRateLoading || isLoadingGames;
  const canShowGameRate = game.bet !== "";

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

    if (game.prob === 0) {
      setAccuracyLoadingProgress(0);
      setDispatchedGame(selectedGame);
      return;
    }

    setAccuracyLoadingProgress(0);
    setDispatchedGame(selectedGame);
    dispatch(getGame({ leagueId: selectedLeague, game: selectedGame }));
    dispatch(updateUser({ email: user.email, credits: user.credits - 1 }));
  };

  // GET LEAGUE EFFECT
  useEffect(() => {
    dispatch(getLeagueGame({ leagueId: selectedLeague }));
  }, [dispatch, selectedLeague]);

  // GET GAME EFFECT
  useEffect(() => {
    if (!selectedLeague || !selectedGame) return;
    dispatch(getGame({ leagueId: selectedLeague, game: selectedGame }));
  }, [dispatch, selectedLeague, selectedGame]);

  // GET GAME RATE EFFECT
  useEffect(() => {
    if (!selectedLeague || !selectedGame) return;
    dispatch(getGameRate({ liga: selectedLeague, game: selectedGame }));
  }, [selectedLeague, selectedGame, dispatch]);

  // GET USER EFFECT
  useEffect(() => {
    if (isUserLoading) return;
    dispatch(getUser({ email: user.email }));
  }, [dispatch]);

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
      <section className="text-white rounded-2xl flex flex-wrap justify-center items-center p-4 gap-5 lg:justify-between border-2 border-yellow-400">
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
          jogos. Ao selecionar o jogo de interesse e clicar no botão{" "}
          <b>pesquisar</b> será computado o uso de 1 crédito. Você pode comprar
          quantos créditos quiser, basta clicar no botão acima comprar créditos.
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
            disabled={isLoadingGames || handleHasReachedLimit()}
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

      {/* TABLE STATS */}
      {isLoadingGameRate ? (
        <section
          className={`max-w-lg w-full bg-[#232323] p-8 rounded-2xl gap-14 self-center border-2 border-yellow-400`}
        >
          <div className="self-center flex flex-col items-center">
            <RingLoader color="#ffbf69" />
          </div>
        </section>
      ) : (
        <>
          {canShowGameRate && (
            <section className="border-2 border-yellow-400 rounded-2xl p-4">
              <h1 className="text-xl font-bold text-center">
                Assertividade do sistema
              </h1>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="text-center">Vitorias</Table.Th>
                    <Table.Th className="text-center">Derrotas</Table.Th>
                    <Table.Th className="text-center">Desempenho</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td align="center" className="text-green-400">
                      {gameRate.win}
                    </Table.Td>
                    <Table.Td align="center" className="text-red-500">
                      {gameRate.loss}
                    </Table.Td>
                    <Table.Td align="center" className="text-blue-500">
                      {formatGameRateStats(gameRate.rateWin)}
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </section>
          )}
        </>
      )}
    </form>
  );
};

export default HomePage;
