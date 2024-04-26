export type GetIpAddressRequest = {};

export type GetIpAddressSuccess = {
  ip: string;
};

export type GetLeagueGameRequest = {
  leagueId: string;
};

export type GetLeagueGameSuccess = {
  games: string[];
};

export type GetGameRequest = {
  leagueId: string;
  game: string;
};

export type GetGameSuccess = {
  bet: string;
  prob: number;
  tableData: any[];
};

export type GetGameRateRequest = {
  liga: string;
  game: string;
};

export type GetGameRateSuccess = {
  home: {
    win: number;
    loss: number;
    rate: number;
  };
  over25: {
    win: number;
    loss: number;
    rate: number;
  };
  under25: {
    win: number;
    loss: number;
    rate: number;
  };
  over35: {
    win: number;
    loss: number;
    rate: number;
  };
  vis: {
    win: number;
    loss: number;
    rate: number;
  };
  ambasMarcam: {
    win: number;
    loss: number;
    rate: number;
  };
};
