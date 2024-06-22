export const useIsPayedPlanValid = () => {
  return localStorage.getItem("payedPlanValid@TBet") === "true";
};
