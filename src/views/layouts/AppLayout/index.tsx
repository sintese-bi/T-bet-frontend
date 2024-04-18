import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSessionCheck } from "../../../hooks";
import { useEffect } from "react";
import { BROWSER_ROUTE } from "../../../constants";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { loggoutUser } from "../../../redux/user/actions";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isUserAuthenticated = useSessionCheck();

  const isHomePage = location.pathname === BROWSER_ROUTE.HOME;

  const redirectToWhatsapp = () => {
    window.open("https://api.whatsapp.com/send?phone=553192932316");
  };
  const handleLoggout = () => dispatch(loggoutUser({ navigate }));

  useEffect(() => {
    console.log("isUserAuthenticated", isUserAuthenticated);
    console.log("isHomePage", isHomePage);
    if (!isUserAuthenticated && isHomePage) {
      navigate(BROWSER_ROUTE.LOGIN);
      return;
    }
  }, [isUserAuthenticated, navigate, isHomePage]);

  return (
    <main className="flex flex-col px-4 lg:px-12 bg-black text-white h-full">
      <header className="flex justify-center py-4">
        <img className="w-24" src={"/logo-bet.png"} alt="Tbet logo" />
      </header>
      <section className="flex-1 h-full">
        <Outlet />
      </section>
      <footer className="flex flex-col items-center gap-5 justify-center py-7">
        {isHomePage && (
          <Button
            onClick={handleLoggout}
            bg={"red"}
            className="bg-red-500 w-full rounded-md p-3"
          >
            Sair
          </Button>
        )}
        <Button
          bg={"green"}
          onClick={redirectToWhatsapp}
          className="bg-green-400 w-full rounded-md p-3"
        >
          Whatsaap
        </Button>
        Copyright © 2024 T-bet
      </footer>
    </main>
  );
};

export default AppLayout;
