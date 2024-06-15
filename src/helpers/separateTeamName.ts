export const separateTeamName = (teamName: string, position: 0 | 1 = 0) => {
  const teamNames = teamName.split("-");
  return teamNames[position];
};
