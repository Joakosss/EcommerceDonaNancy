import { methodPaymentConstants } from "../constants/methodPaymentConstants";

export function tipoPagoActual(id_tipo_pago: string) {
  return methodPaymentConstants.find((tipo) => tipo.id === id_tipo_pago);
}
