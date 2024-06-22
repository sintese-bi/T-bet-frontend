import { Text } from "@mantine/core";
import { BuyPlanModal } from "../Home/components/BuyPlanModal";
import { useDisclosure } from "@mantine/hooks";

function PlanExpired() {
  const [isBuyModalOpen, { close: closeBuyModal, open: openBuyModal }] =
    useDisclosure(false);
  const handleCloseBuyModal = () => closeBuyModal();
  const handleOpenBuyModal = () => openBuyModal();
  return (
    <form className="max-w-7xl w-full m-auto mt-5 flex flex-col gap-10 h-screen">
      {/* CREDIT */}
      <section className="rounded-2xl flex flex-wrap justify-center items-center p-4 gap-5 lg:justify-between border-2 border-green-400">
        <div className="w-full text-center">
          <Text>
            Seu plano expirou, realize a compra e tenha acesso a plataforma.
          </Text>
        </div>
        <div className="flex justify-between items-center w-full gap-4">
          <a
            target="_blank"
            className="bg-green-500 p-2 rounded-md text-white text-center w-full cursor-pointer"
            onClick={handleOpenBuyModal}
          >
            Comprar
          </a>
        </div>
      </section>

      <BuyPlanModal isOpen={isBuyModalOpen} onClose={handleCloseBuyModal} />
    </form>
  );
}

export default PlanExpired;
