import { Button, Modal, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { DefaultState } from "../../../../redux/reducers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BuyPlanModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { email } = useSelector((state: DefaultState) => state.auth.user);

  const handleGoToStripe = () => {
    window.open("https://buy.stripe.com/fZe6s11pdb1a4Ba5lb");
  };

  return (
    <Modal centered onClose={onClose} opened={isOpen}>
      <Modal.Body className="flex flex-col gap-3">
        <Text>
          Ao realizar a compra você deve preencher o mesmo e-mail <b>{email}</b>{" "}
          cadastrado na TBET.
        </Text>
      </Modal.Body>
      <Button
        bg={"green"}
        onClick={handleGoToStripe}
        className="bg-green-400 w-full rounded-md p-3 max-w-lg"
      >
        Ok, ir para o site de compra
      </Button>
    </Modal>
  );
};
