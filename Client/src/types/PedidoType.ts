export type PedidoType = {
  id_pedido: string;
  fecha: Date | string;
  total: number;
  comprobante_pago?: string | null;
  id_estado_pedido: string;
  id_usuario: string;
  id_forma_pago: string;
  id_entrega: string;
};