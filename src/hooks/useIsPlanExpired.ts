export const useIsPlanExpired = () => {
  const isExpired = localStorage.getItem("expired@TBet") === "true";

  return isExpired;
};
