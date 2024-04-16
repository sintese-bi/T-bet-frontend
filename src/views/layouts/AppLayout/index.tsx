import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="flex flex-col px-4 lg:px-12 bg-black text-white h-full">
      <header className="flex justify-center py-4">
        <img className="w-24" src={"/logo-bet.png"} alt="Tbet logo" />
      </header>
      <section className="flex-1 h-full">
        <Outlet />
      </section>
      <footer className="flex flex-col items-center gap-5 justify-center py-7">
        Copyright © 2024 T-bet
        <img className="w-24" src={"/logo-bet.png"} alt="Tbet logo" />
      </footer>
    </main>
  );
};

export default AppLayout;
