import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import Input from "../../../../components/FormComponents/Input";
import Select from "../../../../components/FormComponents/Select";
import { UsuarioType } from "../../../../types/UsuarioType";
import { userTypesConstants } from "../../../../constants/userTypesConstants";
import useMutatePatchUser from "../../../../hooks/NewQuerys/userQuerys/useMutatePatchUser";

type Props = {
  user: UsuarioType;
  onClose: () => void;
};
type FormType = {
  run_usuario: string;
  p_nombre: string;
  p_apellido: string;
  s_apellido: string;
  correo: string;
  telefono: number;
  id_perfil: string;
};

function UpdateUser({ user, onClose }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      run_usuario: user.run_usuario,
      p_nombre: user.p_nombre,
      p_apellido: user.p_apellido,
      s_apellido: user.s_apellido,
      correo: user.correo,
      telefono: user.telefono,
      id_perfil: user.id_perfil,
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
          toast.success("Usuario Modificado ", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
          await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
          onClose();
        },
        onError: () => {
          toast.error("Usuario no modificado", {
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
        Modificar un Usuario
      </h1>
      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <Input
          key={"runInput"}
          label="Run* "
          Placeholder="ej: 10100100-8"
          typeInput="text"
          error={errors.run_usuario}
          {...register("run_usuario", {
            required: "Es requerido",
            pattern: {
              value: /^\d{1,2}\d{3}\d{3}-[\dkK]$/,
              message: "Rut no válido verifica guion y digito verificador",
            },
          })}
        />
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
        <Select
          key={"tipoUsuarioSelect"}
          label="Tipo de cuenta* "
          options={userTypesConstants.filter(
            (type) =>type.id !== "0"&&type.id !== "1"
          )}
          error={errors.id_perfil}
          {...register("id_perfil", {
            required: "Debes seleccionar una categoría",
            validate: (value) =>
              value !== "" || "Selecciona una categoría válida",
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
