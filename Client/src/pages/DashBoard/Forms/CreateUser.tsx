import { useForm } from "react-hook-form";
import { usePostMutation } from "../../../hooks/UsePostMutation";
import { UsuarioType } from "../../../types/UsuarioType";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { userTypesConstants } from "../../../constants/userTypesConstants";

type FormType = {
  p_nombre: string;
  p_apellido: string;
  s_apellido: string;
  telefono: number;
  id_perfil: string;
};



function CreateUser({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>(); //Manejamos el formulario

  const { mutate, isPending } = usePostMutation<UsuarioType>(
    "http://localhost:3000/Usuarios",
    {
      onSuccess: () => {
        toast.success("Usuario registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
        onClose();
      },
      onError: () => {
        toast.error("Usuario no registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
      },
    }
  );

  const onSubmit = (data: FormType) => {
    //Aqui va generar un correo con nombres @donaNancy.cl
    const correo = `${data.p_nombre?.toLowerCase()}.${data.p_apellido?.toLowerCase()}@donaNancy.cl`;
    const nombre_usuario = `${data.p_nombre
      .slice(0, 3)
      .toLowerCase()}.${data.p_apellido.slice(0, 3).toLowerCase()}`;
    const contrasennia = `${data.p_nombre
      .slice(0, 3)
      .toLowerCase()}.${data.p_apellido
      .slice(0, 3)
      .toLowerCase()}${data.telefono.toString().slice(0, 2)}`;
    const user: UsuarioType = {
      nombre_usuario: nombre_usuario,
      p_nombre: data.p_nombre,
      p_apellido: data.p_apellido,
      s_apellido: data.s_apellido,
      telefono: data.telefono,
      perfil: data.id_perfil,
      correo: correo,
      contrasennia: contrasennia,
    };
    mutate(user);
  };

  return (
    <>
      {isPending && <LoadingOverlay/>}

      <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
        Registrando un usuario
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-3" id="nombreInput">
          <label
            htmlFor="p_nombre"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Primer Nombre*{" "}
            {errors.p_nombre?.message && (
              <small className="text-red-700">
                {errors.p_nombre?.message as string}{" "}
              </small>
            )}
          </label>
          <input
            type="text"
            id="p_nombre"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="Tu primer nombre"
            {...register("p_nombre", {
              required: "Es requerido",
            })}
          />
        </div>
        <div className="mt-3" id="pApellidoInput">
          <label
            htmlFor="p_apellido"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Primer Apellido*{" "}
            {errors.p_apellido?.message && (
              <small className="text-red-700">
                {errors.p_apellido?.message as string}
              </small>
            )}
          </label>
          <input
            type="text"
            id="p_apellido"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="Tu primer apellido"
            {...register("p_apellido", {
              required: "Es requerido",
            })}
          />
        </div>
        <div className="mt-3" id="sApellidoInput">
          <label
            htmlFor="s_apellido"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Segundo Apellido*{" "}
            {errors.s_apellido?.message && (
              <small className="text-red-700">
                {errors.s_apellido?.message as string}
              </small>
            )}
          </label>
          <input
            type="text"
            id="s_apellido"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="Tu segundo apellido"
            {...register("s_apellido", {
              required: "Es requerido",
            })}
          />
        </div>
        <div className="mt-3" id="telefonoInput">
          <label
            htmlFor="telefono"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Teléfono*{" "}
            {errors.telefono?.message && (
              <small className="text-red-700">
                {errors.telefono?.message as string}{" "}
              </small>
            )}
          </label>
          <input
            type="number"
            id="telefono"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="912345678"
            {...register("telefono", {
              required: "Requerido",
              validate: (value) =>
                value.toString().length === 9 ||
                "El teléfono debe tener 9 dígitos",
            })}
          />
        </div>
        <div className="mt-3" id="tipoUsuarioSelect">
          <label
            htmlFor="p_nombre"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tipo de cuenta*{" "}
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-pointer"
            {...register("id_perfil")}
          >
            {userTypesConstants.map((userType) => (
              <option key={userType.id} value={userType.id}>
                {userType.descripcion}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrar
        </button>
      </form>
    </>
  );
}

export default CreateUser;
