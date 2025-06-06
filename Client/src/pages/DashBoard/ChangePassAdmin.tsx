import { useForm } from "react-hook-form";
import useMutatePatchUser from "../../hooks/NewQuerys/userQuerys/useMutatePatchUser";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";
import Input from "../../components/FormComponents/Input";
import { passwordNotAllowed } from "../../constants/passwordNotAllowed";

type FormType = {
  contrasenia: string;
  contrasenia2: string;
  cambiar_contrasenia: boolean;
};

function ChangePassAdmin() {
  const { tokens, logout } = useAuthStore();
  const navigate = useNavigate();
  const id = tokens!.id_usuario;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>(); //Manejamos el formulario

  const password = watch("contrasenia");
  const { mutate, isPending } = useMutatePatchUser();

  const onSubmit = (data: FormType) => {
    const newUser = data;
    newUser.cambiar_contrasenia = false;
    mutate(
      { id, newUser },
      {
        onSuccess: async () => {
          navigate("/login");
          logout()
        },
        onError: () => {
          toast.error("Tu contraseña no ha modificado", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
        },
      }
    );
  };

  return (
    <section className="my-10">
      <div className="flex flex-col w-2xl  px-6  mx-auto">
        {isPending && <LoadingOverlay />}
        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
          Primer inicio de sesión
        </h1>
        <p className="text-lg text-primary/90">Debe modificar su contraseña</p>
        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <Input
            key={"contrasenia"}
            label="Contraseña* "
            Placeholder="**********"
            typeInput="password"
            error={errors.contrasenia}
            {...register("contrasenia", {
              required: "Requerido",
              minLength:{value:8,message:'Debe contener al menos 8 caracteres'},
              validate:(value)=> !passwordNotAllowed.includes(value)|| 'Esta contraseña no está permitida'
            })}
          />
          <Input
            key={"contrasenia2"}
            label="Repite Contraseña* "
            Placeholder="**********"
            typeInput="password"
            error={errors.contrasenia2}
            {...register("contrasenia2", {
              required: "Es requerido",
              validate:
              {
                notMatching: (value) =>
                  value === password || "Las contraseñas no coinciden",
                notAdminPass: (value) =>
                  value !== "admin" || "La contraseña no puede ser la anterior"
              }
            })}
          />

          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Modificar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassAdmin;
