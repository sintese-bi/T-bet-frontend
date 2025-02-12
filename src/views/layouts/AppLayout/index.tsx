import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BROWSER_ROUTE } from '../../../constants';
import { Button, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { loggoutUser } from '../../../redux/user/actions';
import { useEffect } from 'react';
import { useSessionCheck } from '../../../hooks';
import { useDisclosure } from '@mantine/hooks';

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLightTheme, { toggle: toogleLightTheme }] = useDisclosure(
    localStorage.getItem('theme') === 'light',
  );
  const handleChangeTheme = () => {
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    toogleLightTheme();
  };
  const isHomePage = location.pathname === BROWSER_ROUTE.HOME;

  const redirectToTelegram = () => {
    window.open('https://t.me/conquistadorbet');
  };

  const handleLoggout = () => dispatch(loggoutUser({ navigate }));

  const isTokenValid = useSessionCheck();
  useEffect(() => {
    if (!isTokenValid) {
      navigate(BROWSER_ROUTE.LOGIN);
    }
  }, [isTokenValid, navigate]);

  return (
    <main
      className={`flex flex-col px-4 lg:px-12 ${isLightTheme ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      <header className="flex justify-center py-4">
        <img className="w-24" src={'/logo-bet.png'} alt="Tbet logo" />
      </header>
      <div className="self-center">
        <Button
          onClick={handleChangeTheme}
          className="bg-green-500 p-2 rounded-md text-white text-center w-full cursor-pointer"
          color="green"
        >
          Mudar tema
        </Button>
      </div>
      <section className="flex-1">
        <Outlet />
      </section>
      <footer className="flex flex-col items-center gap-5 justify-center py-7">
        <Button
          onClick={handleLoggout}
          bg={'red'}
          className="bg-red-500 w-full rounded-md p-3 max-w-lg"
        >
          Sair
        </Button>
        <Text>
          Quer fazer parte do grupo de sucesso que usa a TBET para mandar
          sinais? Junte-se agora
        </Text>
        <Button
          bg={'cyan'}
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

export default AppLayout;
