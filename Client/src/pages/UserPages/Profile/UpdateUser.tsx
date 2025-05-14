import { UsuarioType } from "../../../types/UsuarioType";
import { useForm } from "react-hook-form";
import useMutatePatchUser from "../../../hooks/NewQuerys/userQuerys/useMutatePatchUser";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Input from "../../../components/FormComponents/Input";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  user: UsuarioType;
  onClose: () => void;
};
type FormType = {
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido: string;
  correo: string;
  telefono: number;
  direccion: string;
};

function UpdateUser({ user, onClose }: Props) {
    const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      p_nombre: user.p_nombre,
      s_nombre: user.s_nombre,
      p_apellido: user.p_apellido,
      s_apellido: user.s_apellido,
      correo: user.correo,
      telefono: user.telefono,
      direccion: user.direccion,
    },
  }); //Manejamos el formulario

  const { mutate, isPending } = useMutatePatchUser();

  const onSubmit = (data: FormType) => {
    const id = user.id_usuario!;
    const newUser = data;
    mutate(
      { id, newUser },
      {
        onSuccess: async () => {
          toast.success("Tu usuario Modificado ", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
          await queryClient.invalidateQueries({ queryKey: ["usuarios"] })
          onClose();
        },
        onError: () => {
          toast.error("Tu usuario no modificado", {
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
          key={"nombreInput"}
          label="Primer Nombre* "
          Placeholder="Tu primer nombre"
          typeInput="text"
          error={errors.p_nombre}
          {...register("p_nombre", {
            required: "Es requerido",
          })}
        />
        <Input
          key={"sNombreInput"}
          label="Segundo Nombre* "
          Placeholder="Tu segundo nombre"
          typeInput="text"
          error={errors.s_nombre}
          {...register("s_nombre")}
        />
        <Input
          key={"pApellidoInput"}
          label="Primer Apellido* "
          Placeholder="Tu primer apellido"
          typeInput="text"
          error={errors.p_apellido}
          {...register("p_apellido", {
            required: "Es requerido",
          })}
        />
        <Input
          key={"sApellidoInput"}
          label="Segundo Apellido* "
          Placeholder="Tu segundo apellido"
          typeInput="text"
          error={errors.s_apellido}
          {...register("s_apellido", {
            required: "Es requerido",
          })}
        />
        <Input
          key={"correoInput"}
          label="Correo* "
          Placeholder="Ingrese correo"
          typeInput="text"
          error={errors.correo}
          {...register("correo", {
            required: "Es requerido",
            pattern: {
              value:
                /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
              message: "El correo no es válido",
            },
          })}
        />
        <Input
          key={"telefonoInput"}
          label="Teléfono* "
          Placeholder="Ej: 912345678"
          typeInput="text"
          error={errors.telefono}
          {...register("telefono", {
            required: "Es requerido",
          })}
        />
        <Input
          key={"direccionInput"}
          label="Dirección* "
          Placeholder="Tu dirección"
          typeInput="text"
          error={errors.direccion}
          {...register("direccion", {
            required: "Es requerido",
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

export default UpdateUser;
