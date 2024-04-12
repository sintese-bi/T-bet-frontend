type GameStats = {
  home: string;
  vis: string;
  over25: string;
  over35: string;
  under25: string;
};

export type HighestStatKey = keyof GameStats;
export const orderedStatsKeys: HighestStatKey[] = [
  "home",
  "vis",
  "over25",
  "over35",
  "under25",
];

export const findHighestGameStatWithPreference = (
  game: GameStats
): HighestStatKey => {
  return "home";
  // const orderedStatsKeys: HighestStatKey[] = [
  //   "home",
  //   "vis",
  //   "over25",
  //   "over35",
  //   "under25",
  // ];

  // const stats: Record<HighestStatKey, number> = {
  //   home: parseFloat(game.home),
  //   vis: parseFloat(game.vis),
  //   over25: parseFloat(game.over25),
  //   over35: parseFloat(game.over35),
  //   under25: parseFloat(game.under25),
  // };

  // const highestValue: number = Math.max(...Object.values(stats));

  // const highestStats: HighestStatKey[] = Object.keys(stats).filter(
  //   (key): key is HighestStatKey =>
  //     stats[key as HighestStatKey] === highestValue
  // );

  // return orderedStatsKeys.find((key) => highestStats.includes(key))!;
};
