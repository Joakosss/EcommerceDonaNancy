import { useFormContext } from "react-hook-form";

function Paso3() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const password = watch("contrasenia");

  return (
    <section>
      <div>
        <label
          htmlFor="nombre_usuario"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nombre de usuario*{" "}
          {errors.nombre_usuario?.message && (
            <small className="text-red-700">
              {errors.nombre_usuario?.message as string}{" "}
            </small>
          )}
        </label>
        <input
          type="text"
          id="nombre_usuario"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="Tu nombre de usuario"
          {...register("nombre_usuario", {
            required: "Es requerido",
          })}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="contrasenia"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Contraseña*{" "}
          {errors.contrasenia?.message && (
            <small className="text-red-700">
              {errors.contrasenia?.message as string}{" "}
            </small>
          )}
        </label>
        <input
          type="password"
          id="contrasenia"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="*********"
          {...register("contrasenia", {
            required: "Requerido",
          })}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="confirmar_contrasenia"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirmar contraseña*{" "}
          {errors.confirmar_contrasenia?.message && (
            <small className="text-red-700">
              {errors.confirmar_contrasenia.message as string}
            </small>
          )}
        </label>
        <input
          type="password"
          id="confirmar_contrasenia"
          placeholder="*********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          {...register("confirmar_contrasenia", {
            required: "Requerido",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
      </div>
    </section>
  );
}

export default Paso3;
