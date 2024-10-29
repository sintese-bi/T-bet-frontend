import { Outlet } from "react-router-dom";
import { Button } from "../../../components";
import { Text } from "@mantine/core";

const AuthLayout = () => {
  const redirectToTelegram = () => {
    window.open('https://t.me/conquistadorbet');
  };

  return (
    <main className="flex flex-col px-4 lg:px-12 bg-black text-white h-full">
      <header className="flex justify-center py-4">
        <img className="w-24" src={"/logo-bet.png"} alt="Tbet logo" />
      </header>
      <section className="flex-1">
        <Outlet />
      </section>
      <footer className="flex flex-col items-center gap-5 justify-center py-7">
        <Text>
          Quer fazer parte do grupo de sucesso que usa a TBET para mandar
          sinais? Junte-se agora
        </Text>
        <Button
          bg={"cyan"}
          onClick={redirectToTelegram}
          className="w-full h-full rounded-md p-3 max-w-lg text-white"
        >
          Telegram
        </Button>
        Copyright © 2024 T-bet
      </footer>
    </main>
  );
};

export default AuthLayout;
