import { RingLoader } from "react-spinners";
import {
  formatGameStatsLabel,
  formatGameStatsPorcentage,
} from "../../../../helpers";
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
  const { game, isLoadingGames } = useSelector(
    (state: DefaultState) => state.games
  );

  const changeAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "bg-green-400";
    if (accuracy >= 68) return "bg-yellow-400";
    return "bg-red-400";
  };

  const handleWarningText = (accuracy: number) => {
    if (accuracy >= 90)
      return "Temos confiança que o mercado informado será o resultado dessa partida.";
    if (accuracy >= 68)
      return "Pelas nossas análises existem boas chances do mercado indicado ser o resultado da partida.";
    return "Cuidado, nosso algoritmo não recomenda entrar nessa partida.";
  };

  // LOADING ROLLETE PROGRESS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoadingGames || allowLoadingCompletion) {
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
  }, [isLoadingGames, allowLoadingCompletion]);
  // LOADING ROLLETE PROGRESS
  useEffect(() => {
    if (!isLoadingGames && loadingProgress < 100) {
      setAllowLoadingCompletion(true);
    }
  }, [isLoadingGames, loadingProgress]);
  // ACCURACY LOADING PROGRESS
  useEffect(() => {
    if (!isLoadingGames && selectedGame) {
      const targetProgress =
        parseInt(formatGameStatsPorcentage(String(game.prob)), 10) || 0;
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
  }, [isLoadingGames, selectedGame, game.prob, setAccuracyLoadingProgress]);

  return (
    <>
      {isLoadingGames ? (
        <section
          className={`max-w-lg w-full m-auto bg-[#232323] p-8 rounded-2xl gap-14 self-center border-2 border-yellow-400`}
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
            <section
              className={`max-w-lg w-full p-8 rounded-2xl self-center border-2 border-yellow-400`}
            >
              {/* GAME STATS */}
              <div className="flex flex-col flex-wrap gap-5 items-center ">
                <div className="flex flex-col items-center">
                  <Text className="text-2xl">Mercado</Text>
                  <Text className="text-green-400">
                    <b>{formatGameStatsLabel(game.bet)}</b>
                  </Text>
                </div>

                <div className="flex flex-col w-full items-center">
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
                </div>
                <div className="text-center">
                  <Text>{handleWarningText(accuracyLoadingProgress)}</Text>
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
