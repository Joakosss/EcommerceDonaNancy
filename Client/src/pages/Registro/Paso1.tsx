import { useFormContext } from "react-hook-form";

function Paso1({ onNext }: { onNext: () => void }) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger(["p_nombre", "p_apellido", "s_apellido"]);
    if (isValid) {
      onNext(); // solo avanza si es válido
    }
  };

  return (
    <>

      <div>
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
      <div className="mt-3">
        <label
          htmlFor="s_nombre"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Segundo Nombre
        </label>
        <input
          type="text"
          id="s_nombre"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="Tu segundo nombre"
          {...register("s_nombre")}
        />
      </div>
      <div className="mt-3">
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
      <div className="mt-3">
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
      <button
        type="button"
        className=" mt-3 w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={handleNext}
      >
        Siguiente
      </button>
    </>
  );
}

export default Paso1;
