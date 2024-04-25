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
};

export type GetGameRateSuccess = {
  home: {
    win: number;
    loss: number;
  };
  over25: {
    win: number;
    loss: number;
  };
  under25: {
    win: number;
    loss: number;
  };
  over35: {
    win: number;
    loss: number;
  };
  vis: {
    win: number;
    loss: number;
  };
  ambasMarcam: {
    win: number;
    loss: number;
  };
};
