export const useIsFreePlanExpired = () => {
  return localStorage.getItem("freePlanValid@TBet") === "true";
};
