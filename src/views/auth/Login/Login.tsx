import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { BROWSER_ROUTE } from "../../../constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/user/actions";
import { useState } from "react";
import ResetPasswordLink from "./components/ResetPasswordLink";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const handleCloseForgotPasswordModal = () => setForgotPasswordModal(false);
  const handleOpenForgotPasswordModal = () => setForgotPasswordModal(true);

  const onSubmit = (data: any) => {
    dispatch(
      loginUser({ email: data.email, password: data.password, navigate })
    );
  };

  return (
    <main className="flex justify-center items-center h-full">
      <section className="flex flex-col items-center gap-3 w-full lg:max-w-lg">
        <Text size="lg">Entre com seu email e senha</Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-3"
        >
          <TextInput
            {...register("email", { required: "E-mail é obrigatório" })}
            type="email"
            placeholder="E-mail"
          />

          {errors.email && (
            <Text c={"red"} size="sm">
              {errors.email.message}
            </Text>
          )}

          <PasswordInput
            {...register("password", { required: "Senha é obrigatória" })}
            type="password"
            placeholder="Senha"
          />

          {errors.password && (
            <Text c={"red"} size="sm">
              {errors.password.message}
            </Text>
          )}

          <Button type="submit" color="green" className="mt-5">
            Entrar
          </Button>
        </form>
        <p>
          Não possui uma conta?{" "}
          <a className="text-green-400" href={BROWSER_ROUTE.REGISTER}>
            Cadastrar
          </a>
        </p>

        <Text
          onClick={handleOpenForgotPasswordModal}
          className="text-green-400 hover:cursor-pointer"
        >
          Esqueceu a senha?
        </Text>
      </section>
      <ResetPasswordLink
        onClose={handleCloseForgotPasswordModal}
        open={forgotPasswordModal}
      />
    </main>
  );
};

export default LoginPage;
