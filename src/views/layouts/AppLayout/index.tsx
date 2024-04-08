import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="flex flex-col px-4 lg:px-12 bg-[#333333] text-white">
      <header className="flex justify-center py-7">
        <img src={"/logo.png"} alt="Tbet logo" />
      </header>
      <section className="flex-1">
        <Outlet />
      </section>
      <footer className="flex justify-center py-7">
        Copyright © 2024 T-bet
      </footer>
    </main>
  );
};

export default AppLayout;
