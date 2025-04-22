import { Link } from "react-router-dom";
import logo from "../images/NancySmall.svg";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

type FormType = {
  user: string;
  pass: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const { mutate, error } = useMutation({
    mutationFn: async ({ user, pass }: { user: string; pass: string }) => {
      const response = await axios.get("http://localhost:3000/Usuarios", {
        user,
        pass,
      });
      return response;
    },
    onSuccess: () => {
      alert("exito");
    },
    onError: () => "Error",
  });

  const onSubmit = (data: FormType) => {
    mutate(data);
  };

  return (
    <>
      <section className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6  mx-auto h-screen ">
          <Link
            to={"/"}
            className="flex items-center mb-6 text-2xl font-semibold dark:text-black"
          >
            <img
              className="w-[130px] h-[130px]"
              src={logo}
              alt="logo"
              loading="eager"
            />
          </Link>
          <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {error?.message && (
                <small className="font-bold text-red-600">error.message</small>
              )}
              {errors?.user && (
                <small className="font-bold text-red-600">
                  {errors?.user.message}
                </small>
              )}
              {errors?.pass && (
                <small className="font-bold text-red-600">
                  {errors?.pass.message}
                </small>
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                Iniciar Sesión
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="usuario"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nombre de Usuario*
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    placeholder="Tu nombre"
                    {...register("user", {
                      minLength: { value: 1, message: "Usuario es requerido" },
                    })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contraseña*
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    {...register("pass", {
                      minLength: { value: 1, message: "Usuario es requerido" },
                    })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Conectarse
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  ¿No tienes cuenta?{" "}
                  <Link
                    to={"/registro"}
                    className="font-medium text-primary hover:underline "
                  >
                    Registrarse
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
