import { useFormContext } from "react-hook-form";

function Paso2({ onNext }: { onNext: () => void }) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      onNext(); // solo avanza si es válido
    }
  };

  return (
    <section>
      <div>
        <label
          htmlFor="correo"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Correo Electronico*{" "}
          {errors.correo?.message && (
            <small className="text-red-700">
              {errors.correo?.message as string}{" "}
            </small>
          )}
        </label>
        <input
          type="email"
          id="correo"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="TuCorreo@correo.cl"
          {...register("correo", {
            required: "Es requerido",
            pattern: {
              value:
                /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
              message: "El correo no es válido",
            },
          })}
        />
      </div>
      <div className="mt-3">
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
      <div className="mt-3">
        <label
          htmlFor="direccion"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Dirección{" "}
          {errors.direccion?.message && (
            <small className="text-red-700">
              {errors.Direccion?.message as string}{" "}
            </small>
          )}
        </label>
        <input
          type="string"
          id="direccion"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="Calle 123 Comuna"
          {...register("direccion")}
        />
      </div>
      <button
        type="button"
        className=" mt-3 w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={handleNext}
      >
        Siguiente
      </button>
    </section>
  );
}

export default Paso2;
