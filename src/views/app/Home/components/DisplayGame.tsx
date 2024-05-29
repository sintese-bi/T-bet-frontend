import { formatGameStats } from "../../../../helpers";
import { Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { DefaultState } from "../../../../redux/reducers";
import { useEffect, useState } from "react";

type Props = {
  selectedGame: any;
  accuracyLoadingProgress: number;
  setAccuracyLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
};

const DisplayGame = ({
  selectedGame,
  accuracyLoadingProgress,
  setAccuracyLoadingProgress,
}: Props) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [allowLoadingCompletion, setAllowLoadingCompletion] = useState(false);
  const { game } = useSelector((state: DefaultState) => state.games);

  const changeAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "bg-green-400";
    if (accuracy >= 70) return "bg-yellow-400";
    if (accuracy >= 51) return "bg-orange-400";
    return "bg-red-400";
  };

  const handleWarningText = (accuracy: number) => {
    if (accuracy >= 90)
      return "Temos confiança que o mercado informado será o resultado dessa partida.";
    if (accuracy >= 70)
      return "Pelas nossas análises existem boas chances do mercado indicado ser o resultado da partida.";
    if (accuracy >= 51) return "Indicamos analisar o mercado antes de apostar";
    return "Cuidado, nosso algoritmo não recomenda entrar nessa partida.";
  };

  // LOADING ROLLETE PROGRESS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (allowLoadingCompletion) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          const nextProgress = prevProgress + 20;
          if (nextProgress === 100) {
            clearInterval(interval);
            setAllowLoadingCompletion(false);
            return 100;
          }
          return nextProgress;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [allowLoadingCompletion]);

  // LOADING ROLLETE PROGRESS
  useEffect(() => {
    if (loadingProgress < 100) {
      setAllowLoadingCompletion(true);
    }
  }, [, loadingProgress]);

  // ACCURACY LOADING PROGRESS
  useEffect(() => {
    if (selectedGame) {
      const targetProgress =
        parseInt(formatGameStats(String(game.prob)), 10) || 0;
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
  }, [, selectedGame, game.prob, setAccuracyLoadingProgress]);

  return (
    <>
      {selectedGame && (
        <>
          {game.prob === 0 ? (
            <div className="max-w-lg w-full p-8 rounded-2xl self-center border-2 border-green-400 text-center">
              Desculpe! Estou aprendendo sobre este jogo. Busque outra partida e
              lucre muito. Essa pesquisa não gastou nenhuma consulta!
            </div>
          ) : (
            <section
              className={`max-w-lg w-full p-8 rounded-2xl self-center border-2 border-green-400`}
            >
              {/* GAME STATS */}
              <div className="flex flex-col flex-wrap gap-5 items-center ">
                <div className="flex flex-col items-center">
                  <Text className="text-2xl">Mercado</Text>
                  <Text className="text-green-400 text-lg">
                    <b>{game.bet}</b>
                  </Text>
                  {game.martinGale === 1 && (
                    <div className="flex-col gap-4 text-center mt-2">
                      <Text className="text-green-400">Com 3 gales:</Text>
                      <Text className="text-green-400">
                        1 gale: 0.5% da banca
                      </Text>
                      <Text className="text-green-400">
                        2 gale: 1.0% da banca
                      </Text>
                      <Text className="text-green-400">
                        3 gale: 2.0% da banca
                      </Text>
                    </div>
                  )}
                </div>

                {/* <div className="flex flex-col w-full items-center">
                  <Text className="text-2xl">Acurácia</Text>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className={`${changeAccuracyColor(accuracyLoadingProgress)} h-2.5 rounded-full`}
                      style={{ width: `${accuracyLoadingProgress}%` }}
                    ></div>
                  </div>
                  <Text>
                    <b>{accuracyLoadingProgress}%</b>
                  </Text>
                </div> */}
                <div className="text-center">
                  <Text>{handleWarningText(game.prob)}</Text>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default DisplayGame;
