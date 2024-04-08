import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { BROWSER_ROUTE } from "../../constants";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate(BROWSER_ROUTE.HOME);

  return (
    <main className="flex flex-col h-screen">
      <section className="flex flex-col items-center pt-2 gap-4">
        <img src={"/logo.png"} alt="Tbet logo" />

        <p className="text-green-400 font-bold text-center">
          SOMOS O PRIMEIRO GRUPO NO BRASIL A UTILIZAR CHAT GPT-4 PARA ANÁLISE DO
          MERCADO.
        </p>
      </section>
      <section className="bg-[url('/banner.png')] flex-1 bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <button className="grad p-3" onClick={goToHome}>
          Accessar plataforma
        </button>
      </section>
      <section className="max-w-2xl w-full mx-auto py-4 px-3">
        <Swiper
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
          }}
        >
          <SwiperSlide>
            <div className="flex flex-col gap-3">
              <h1 className="text-center text-2xl font-bold">Quem Somos?</h1>
              <p className=" text-center lg:text-left">
                <b className="text-green-400">
                  Nosso time é composto por físicos, matemáticos e estatísticos
                  com mais de 10 anos de experiência em análise exploratória.
                </b>
                Aplicamos o <b className="text-green-400">Chat-GPT</b> e
                técnicas de Machine Learning, para estudar os vários mercados
                disponíveis e entregar as melhores análises. Nosso sistema
                monitora as partidas 24 horas por dia, fazendo várias análises
                de entrada e fornecendo as melhores oportunidades.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col gap-3">
              <h1 className="text-center text-2xl font-bold">Como funciona?</h1>
              <p className=" text-center lg:text-left">
                Programamos um Robô que realiza uma inferência precisa dos
                resultados dos jogos. Através de sinais personalizados, enviamos
                para o nosso Grupo Vip entradas constantes para as 4 Ligas.
                <b className="text-green-400">
                  Somos a única equipe Machine Learning e Estatísticos do
                  mercado voltada para análise de dados de esportes virtuais com
                  uso de inteligencia artificial.
                </b>
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  );
};

export default LandingPage;
