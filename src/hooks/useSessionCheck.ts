import { useEffect, useState } from "react";

export const useSessionCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const verifySession = () => {
      return setIsAuthenticated(localStorage.getItem("token@TBet") !== null);
    };

    verifySession();
  }, []);

  return isAuthenticated;
};
