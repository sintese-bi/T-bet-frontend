import { PasswordInput, Text } from "@mantine/core";
import { Button } from "../../../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/user/actions";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const useToken = searchParams.get("use_token");
  const useEmail = searchParams.get("use_email");

  const onSubmit = (data: { password: string }) => {
    if (!useToken || !useEmail) return;
    dispatch(
      resetPassword({
        password: data.password,
        email: useEmail,
        token: useToken,
        navigate,
      })
    );
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  return (
    <main className="flex justify-center items-center h-full">
      <section className="flex flex-col items-center gap-3 w-full lg:max-w-lg">
        <Text size="lg">Digite a sua nova senha</Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-3"
        >
          <PasswordInput
            {...register("password", { required: "Nova senha é obrigatória" })}
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
      </section>
    </main>
  );
};

export default ForgotPassword;
