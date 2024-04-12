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
  home: string;
  over25: string;
  over35: string;
  under25: string;
  vis: string;
  tableData: any[];
};
