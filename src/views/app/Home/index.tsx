import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { RingLoader } from "react-spinners";
import { Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { DefaultState } from "../../../redux/reducers";
import { Notify } from "../../../utils";

import { useGetWindow } from "../../../hooks/useGetWindow";
import { getUser } from "../../../redux/user/actions";
import { useIsPlanExpired } from "../../../hooks";
import { BuyPlanModal } from "./components/BuyPlanModal";
import { getNextGames } from "../../../redux/actions";
import { formatGameRateStats, formatMercadoLabel } from "../../../helpers";
import { separateTeamName } from "../../../helpers/separateTeamName";
import { getCountryFlag } from "../../../helpers/getCountryFlag";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const isUserPlanExpired = useIsPlanExpired();
  const { user, isUserLoading } = useSelector(
    (state: DefaultState) => state.auth
  );

  const { games, isLoading } = useSelector(
    (state: DefaultState) => state.games
  );

  const customWindow = useGetWindow();

  const [isBuyModalOpen, { close: closeBuyModal, open: openBuyModal }] =
    useDisclosure(false);
  const handleCloseBuyModal = () => closeBuyModal();
  const handleOpenBuyModal = () => openBuyModal();

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

  useEffect(() => {
    dispatch(getNextGames());
  }, []);

  return isUserLoading ? (
    <section className="flex justify-center items-center h-full">
      <RingLoader color="#ffbf69" />
    </section>
  ) : (
    <form className="max-w-7xl w-full m-auto mt-5 flex flex-col gap-10">
      {!isLoading && (
        <Confetti
          recycle={false}
          width={customWindow.width}
          height={customWindow.height}
        />
      )}

      {/* CREDIT */}
      <section className="rounded-2xl flex flex-wrap justify-center items-center p-4 gap-5 lg:justify-between border-2 border-green-400">
        <div className="w-full text-center">
          {user.credits > 3 || user.credits === 0 ? (
            <>
              <Text>
                Por apenas R$ 9,90 você tem acesso ilimitado a plataforma por 30
                dias, boas apostas!
              </Text>
              <Text>Não operar aos finais de semana</Text>
            </>
          ) : (
            <Text>
              Você possui 3 consultas gratuitas, pesquise o jogo de interesse e
              aproveite!
            </Text>
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

      {/* GAME STATS */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <Text className="text-xl">
            Nosso sistema está calculando os melhores jogos para suas apostas!
          </Text>
          <Text>Aguarde um momento...</Text>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto py-5 px-3 my-5">
          {games.map((game) => (
            <div className="border-2 border-green-500 rounded-lg ">
              <div className="flex flex-wrap lg:justify-between justify-center items-center p-3">
                <div className="flex flex-col justify-center items-center p-4 ">
                  <img
                    src={`https://media.api-sports.io/flags/${getCountryFlag(separateTeamName(game.game))}.svg`}
                    alt={separateTeamName(game.game)}
                    className="w-52 border-2 border-slate-700"
                  />
                  <Text>{separateTeamName(game.game)}</Text>
                </div>
                <div className="flex flex-col items-center">
                  <Text>VS</Text>
                  <Text>Hoje às {game.matchTime}</Text>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                  <img
                    src={`https://media.api-sports.io/flags/${getCountryFlag(separateTeamName(game.game, 1))}.svg`}
                    alt={separateTeamName(game.game, 1)}
                    className="w-52 border-2 border-slate-700"
                  />
                  <Text>{separateTeamName(game.game, 1)}</Text>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center my-4">
                <Text>Resultado final</Text>
                <Text className="text-2xl">
                  {formatMercadoLabel(game.bet)}{" "}
                  {/* {game.odd.toString() !== "-" && (
                    <span className="text-green-500">{game.odd}</span>
                  )} */}
                </Text>
              </div>

              {/* {game.gale && (
                <div className="flex flex-col justify-between p-3">
                  <Text className="text-bold">
                    Com <span className="text-green-500">3 gales</span>
                  </Text>
                  <div className="flex justify-between">
                    <Text className="p-2 bg-green-500 rounded-lg">
                      1º gale: 0.5% da banca
                    </Text>
                    <Text>2º gale: 1.0% da banca</Text>
                    <Text>3º gale: 2.0% da banca</Text>
                  </div>
                </div>
              )} */}
              <div className="p-4 w-full overflow-x-scroll">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Mercado</Table.Th>
                      <Table.Th>Vitórias</Table.Th>
                      <Table.Th>Derrotas</Table.Th>
                      <Table.Th>Desempenho</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr key={game.game}>
                      <Table.Td>{formatMercadoLabel(game.bet)}</Table.Td>
                      <Table.Td>
                        <span className="text-green-400">{game.rate.win}</span>
                      </Table.Td>
                      <Table.Td>
                        <span className="text-red-400">{game.rate.loss}</span>
                      </Table.Td>
                      <Table.Td>
                        <span className="text-blue-400">
                          {formatGameRateStats(game.rate.rateWin)}
                        </span>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      )}

      <BuyPlanModal isOpen={isBuyModalOpen} onClose={handleCloseBuyModal} />
    </form>
  );
};

export default HomePage;
