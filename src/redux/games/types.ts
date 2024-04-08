export type GetLeagueRequest = {
  id: string;
};

export type GetLeagueSuccess = {
  home: string;
  over25: string;
  over35: string;
  under25: string;
  vis: string;
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

export type GetGameSuccess = GetLeagueSuccess & {
  tableData: any[];
};
