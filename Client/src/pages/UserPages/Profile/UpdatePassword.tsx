import { useForm } from "react-hook-form";
import useMutatePatchUser from "../../../hooks/NewQuerys/userQuerys/useMutatePatchUser";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Input from "../../../components/FormComponents/Input";

type Props = {
  id: string;
  onClose: () => void;
};
type FormType = {
  contrasenia: string;
  contrasenia2: string;
};

function UpdatePassword({ id, onClose }: Props) {
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
    mutate(
      { id, newUser },
      {
        onSuccess: () => {
          toast.success("Tu contraseña ha sido modificado ", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
          onClose();
        },
        onError: () => {
          toast.error("Tu contraseña modificado", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
        },
      }
    );
  };

  return (
    <>
      {isPending && <LoadingOverlay />}
      <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
        Modificar Usuario
      </h1>
      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <Input
          key={"contrasenia"}
          label="Contraseña* "
          Placeholder="**********"
          typeInput="password"
          error={errors.contrasenia}
          {...register("contrasenia", {
            required: "Es requerido",
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
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />

        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Modificar
        </button>
      </form>
    </>
  );
}

export default UpdatePassword;
