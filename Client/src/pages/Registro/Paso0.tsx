import { useFormContext } from "react-hook-form";

function Paso0({ onNext }: { onNext: () => void }) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger(["run_usuario"]);
    if (isValid) {
      onNext(); // solo avanza si es válido
    }
  };

  return (
    <>
      <div id="run">
        <label
          htmlFor="run"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Run*{" "}
          {errors.run_usuario?.message && (
            <small className="text-red-700">
              {errors.run_usuario?.message as string}
            </small>
          )}
        </label>
        <input
          type="text"
          id="run_usuario"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="20200200-2"
          {...register("run_usuario", {
            required: "Es requerido",
            pattern: {
              value: /^\d{1,2}\d{3}\d{3}-[\dkK]$/,
              message: "Rut no válido verifica guion y digito verificador",
            },
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

export default Paso0;
