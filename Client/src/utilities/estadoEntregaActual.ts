import { estadoEntregaConstants } from "../constants/estadoEntregaConstants";

export function estadoEntregaActual(id_estado_entrega: string) {
  return estadoEntregaConstants.find(
    (estado) => estado.id === id_estado_entrega
  );
}
