import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import { estadoEntregaConstants } from "../../../../constants/estadoEntregaConstants";
import useMutatePatchPedidos from "../../../../hooks/NewQuerys/pedidosQuerys/useMutatePatchPedidos";
import { useState } from "react";

type Props = {
  id: string;
  onClose: () => void;
};

function VendedorUpdate({ id, onClose }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutatePatchPedidos();
  const [isRadioSelect, setIsRadioSelect] = useState("");

  const onSubmit = () => {
    if (isRadioSelect !== "") {
      mutate(
        { id, newPedido: { id_estado_entrega: isRadioSelect } },
        {
          onSuccess: () => {
            toast.success("Entrega Modificado ", {
              hideProgressBar: true,
              position: "top-left",
              autoClose: 1000,
            });
            queryClient.invalidateQueries({ queryKey: ["productos"] });
            onClose();
          },
          onError: () => {
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
        Modificar un pedido (Vendedor)
      </h1>
      {estadoEntregaConstants.map((estadoEntrega) => (
        <label key={estadoEntrega.id} className="flex items-center gap-2">
          <input
            type="radio"
            name="estado_entrega"
            value={estadoEntrega.id}
            className="text-primary focus:ring-primary"
            onChange={() => {
              setIsRadioSelect(estadoEntrega.id);
            }}
          />
          {estadoEntrega.descripcion}
        </label>
      ))}
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

export default VendedorUpdate;
