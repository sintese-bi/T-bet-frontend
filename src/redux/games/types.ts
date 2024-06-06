export type GetNextGamesSuccess = {
  bet: string;
  gale: boolean;
  matchTime: string;
  game: string;
  odd: number;
  rate: {
    loss: number;
    win: number;
    rateWin: number;
  };
};

export type NextGamesApiResponse = {
  bets: string[];
  gale: any;
  matchTime: string[];
  nextGames: string[];
  odds: number[];
  rate: Rate[];
};

type Rate = {
  loss: number;
  rateWin: number;
  win: number;
};

type Gale = {
  galeAmbas: number;
  galeHome: number;
  galeOver: number;
  galeUnder: number;
};
