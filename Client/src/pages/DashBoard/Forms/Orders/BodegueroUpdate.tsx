import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import { useState } from "react";
import useMutatePatchEntrega from "../../../../hooks/NewQuerys/pedidosQuerys/useMutatePatchEntrega";

type Props = {
  id: string;
  onClose: () => void;
};

function BodegueroUpdate({ id, onClose }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutatePatchEntrega();
  const [isRadioSelect, setIsRadioSelect] = useState("");

  const onSubmit = () => {
    if (isRadioSelect !== "") {
      mutate(
        { id, newEntrega: { id_estado_entrega: isRadioSelect } },
        {
          onSuccess: () => {
            toast.success("Entrega Modificado ", {
              hideProgressBar: true,
              position: "top-left",
              autoClose: 1000,
            });
            queryClient.invalidateQueries({ queryKey: ["pedidos"] });
            onClose();
          },
          onError: (error) => {
            console.log(error.message);
            toast.error("Entrega no modificado", {
              hideProgressBar: true,
              position: "top-left",
              autoClose: 1000,
            });
          },
        }
      );
    }
  };

  return (
    <>
      {isPending && <LoadingOverlay />}
      <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
        Modificar un pedido (Bodeguero)
      </h1>
      <div className="grid grid-cols-2 h-30 gap-2">
        <label
          key="Entrega4"
          className="flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 m-2 p-2 rounded-md font-bold text-white"
        >
          <input
            type="radio"
            name="estado_entrega"
            value="0"
            className="text-primary focus:ring-primary"
            onChange={() => {
              setIsRadioSelect("0");
            }}
          />
          En proceso
        </label>
        <label
          key="Entrega3"
          className="flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary/90 m-2 p-2 rounded-md font-bold text-white"
        >
          <input
            type="radio"
            name="estado_entrega"
            value="4"
            className="text-primary focus:ring-primary"
            onChange={() => {
              setIsRadioSelect("4");
            }}
          />
          Completado
        </label>
      </div>

      <button
        type="button"
        className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={onSubmit}
      >
        Modificar
      </button>
    </>
  );
}

export default BodegueroUpdate;
