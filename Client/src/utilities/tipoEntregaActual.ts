import { tipoEntregaConstants } from "../constants/tipoEntregaConstants";

export function tipoEntregaActual(id_tipo_entrega: string) {
  return tipoEntregaConstants.find((tipo) => tipo.id === id_tipo_entrega);
}
