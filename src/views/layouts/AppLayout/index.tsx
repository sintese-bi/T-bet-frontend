import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BROWSER_ROUTE } from "../../../constants";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { loggoutUser } from "../../../redux/user/actions";
import { useEffect } from "react";
import { useSessionCheck } from "../../../hooks";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === BROWSER_ROUTE.HOME;

  const redirectToWhatsapp = () => {
    window.open("https://api.whatsapp.com/send?phone=553192932316");
  };
  const handleLoggout = () => dispatch(loggoutUser({ navigate }));

  const isTokenValid = useSessionCheck();
  useEffect(() => {
    if (!isTokenValid) {
      navigate(BROWSER_ROUTE.HOME);
    }
  }, [isTokenValid, navigate]);

  return (
    <main className="flex flex-col px-4 lg:px-12 bg-black text-white h-full">
      <header className="flex justify-center py-4">
        <img className="w-24" src={"/logo-bet.png"} alt="Tbet logo" />
      </header>
      <section className="flex-1">
        <Outlet />
      </section>
      <footer className="flex flex-col items-center gap-5 justify-center py-7">
        {isHomePage && (
          <Button
            onClick={handleLoggout}
            bg={"red"}
            className="bg-red-500 w-full rounded-md p-3 max-w-lg"
          >
            Sair
          </Button>
        )}
        <Button
          bg={"green"}
          onClick={redirectToWhatsapp}
          className="bg-green-400 w-full rounded-md p-3 max-w-lg"
        >
          Whatsaap
        </Button>
        Copyright © 2024 T-bet
      </footer>
    </main>
  );
};

export default AppLayout;
