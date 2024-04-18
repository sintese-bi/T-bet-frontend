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
