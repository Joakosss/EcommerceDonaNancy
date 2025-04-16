import { useParams } from "react-router-dom";
import cartC from "../../../images/CartC.svg";

type ErrorType = "pagoAbandonado" | "error" | "pagoRechazado";

function Failure() {
  const { error } = useParams<{error:ErrorType}>();

  const messages = {
    pagoAbandonado: { message: "Abandonaste el pago" },
    error: { message: "Error al procesar tu pago" },
    pagoRechazado: { message: "Medio de pago rechazado" },
  };

  return (
    <div className="grid place-items-center  h-full w-full">
      <img src={cartC} className="max-h-[500px]" />
      <h4 className="text-2xl font-bold text-[#1c4364]">Upss..</h4>
      <p className="text-xl font-bold text-[#1c4364]">
        {messages[error!]?.message || "Error desconocido"}
      </p>
    </div>
  );
}

export default Failure;
