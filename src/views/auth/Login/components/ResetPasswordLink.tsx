import { Button, Modal, Text, TextInput } from "@mantine/core";
import { useDispatch } from "react-redux";
import { resetPasswordLink } from "../../../../redux/user/actions";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ResetPasswordLink: React.FC<Props> = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const resetPassword = (data: { email: string }) => {
    dispatch(resetPasswordLink({ email: data.email }));
    onClose();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Digite seu e-mail para recuperar a senha."
      centered
      color="#000000"
    >
      <form onSubmit={handleSubmit(resetPassword)}>
        <div className="flex flex-col gap-5 ">
          <TextInput
            {...register("email", {
              required: "E-mail necessário para enviar o link.",
            })}
            placeholder="E-mail"
          />

          {errors.email && (
            <Text c={"red"} size="sm">
              {errors.email.message}
            </Text>
          )}

          <Button type="submit" bg={"green"}>
            Enviar link de recuperação
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ResetPasswordLink;
