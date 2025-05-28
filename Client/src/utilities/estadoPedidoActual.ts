import { estadoPedidoConstants } from "../constants/estadoPedidoConstants";

export function estadoPedidoActual(id_estado_pedido: string) {
  return estadoPedidoConstants.find((estado) => estado.id === id_estado_pedido);
}
