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
import { useIsPlanExpired } from "../../../hooks";
import { useDisclosure } from "@mantine/hooks";
import { BuyPlanModal } from "./components/BuyPlanModal";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const isUserPlanExpired = useIsPlanExpired();
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
  const [sortedGames, setSortedGames] = useState<string[]>(games);
  const customWindow = useGetWindow();

  const handleSortGames = (search: string) => {
    const searchValue = search
      .toLowerCase()
      .replace(/(^|\s)\S/g, (firstLetter: string) => {
        return firstLetter.toUpperCase();
      });

    const sortedGames = games
      .filter((game) => game.includes(searchValue))
      .sort((a, b) => {
        const [teamOneGameOne, teamTwoGameOne] = a
          .split("-")
          .map((team) => team.trim());
        const [teamOneGameTwo, teamTwoGameTwo] = b
          .split("-")
          .map((team) => team.trim());

        const isTeamOneGameOneSearch = teamOneGameOne.includes(searchValue);
        const isTeamOneGameTwoSearch = teamOneGameTwo.includes(searchValue);
        const isTeamTwoGameOneSearch = teamTwoGameOne.includes(searchValue);
        const isTeamTwoGameTwoSearch = teamTwoGameTwo.includes(searchValue);

        if (isTeamOneGameOneSearch && isTeamOneGameTwoSearch) {
          return teamTwoGameOne.localeCompare(teamTwoGameTwo);
        }

        if (isTeamOneGameOneSearch && !isTeamOneGameTwoSearch) {
          return -1;
        }

        if (!isTeamOneGameOneSearch && isTeamOneGameTwoSearch) {
          return 1;
        }

        if (isTeamTwoGameOneSearch && isTeamTwoGameTwoSearch) {
          return teamOneGameOne.localeCompare(teamOneGameTwo);
        }

        if (isTeamTwoGameOneSearch && !isTeamTwoGameTwoSearch) {
          return -1;
        }

        if (!isTeamTwoGameOneSearch && isTeamTwoGameTwoSearch) {
          return 1;
        }

        return 0;
      });

    setSortedGames(sortedGames);
  };

  const [isBuyModalOpen, { close: closeBuyModal, open: openBuyModal }] =
    useDisclosure(false);
  const handleCloseBuyModal = () => closeBuyModal();
  const handleOpenBuyModal = () => openBuyModal();

  const selectedLeague = watch("league");
  const selectedGame = watch("game");
  const isLoadingGameRate = isGameRateLoading || isLoadingGames;
  const canShowGameRate = game.bet !== "";

  const handleBlockGameSearch = () =>
    user.credits === 0 || isUserPlanExpired || isLoadingGames;
  const handleResetDispatchedGame = () => setDispatchedGame("");
  const onSubmit = () => {
    if (handleBlockGameSearch()) {
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

  useEffect(() => {
    if (isUserPlanExpired) {
      Notify({
        message:
          "Seu plano expirou, por favor, compre para ter mais 30 dias de acesso.",
        type: "error",
      });
    }
  }, []);

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
        <div className="w-full text-center">
          {user.credits > 3 || user.credits === 0 ? (
            <>
              Por apenas R$ 9,90 você tem acesso ilimitado a plataforma por 30
              dias, boas apostas!
            </>
          ) : (
            <>
              Você possui 3 consultas gratuitas, pesquise o jogo de interesse e
              aproveite!
            </>
          )}
        </div>
        <div className="flex justify-between items-center w-full gap-4">
          <a
            target="_blank"
            className="bg-green-500 p-2 rounded-md text-white text-center w-full cursor-pointer"
            onClick={handleOpenBuyModal}
          >
            Comprar
          </a>
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
                data={sortedGames.map((game) => game)}
                onChange={(value) => {
                  handleResetDispatchedGame();
                  field.onChange(value);
                }}
                nothingFoundMessage="O nome dos times deve ser igual a como aparece na bet."
                searchable
                disabled={handleBlockGameSearch()}
                onSearchChange={handleSortGames}
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
            disabled={handleBlockGameSearch()}
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

      <BuyPlanModal isOpen={isBuyModalOpen} onClose={handleCloseBuyModal} />
    </form>
  );
};

export default HomePage;
