import { Button, Text, TextInput } from "@mantine/core";
import { BROWSER_ROUTE } from "../../../constants";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/user/actions";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    dispatch(registerUser({ email: data.email, navigate }));
  };

  return (
    <main className="flex justify-center items-center h-full">
      <section className="flex flex-col items-center gap-3 w-full lg:max-w-lg">
        <Text size="lg" className="text-center">
          Cadastre-se e ganhe 3 créditos de bônus na plataforma.
        </Text>
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
          <Button type="submit" color="green" className="mt-5">
            Criar conta
          </Button>
        </form>
        <p>
          Ja tem uma conta?{" "}
          <a className="text-green-400" href={BROWSER_ROUTE.LOGIN}>
            Entrar
          </a>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
