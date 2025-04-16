export type PedidoType = {
  id: string;
  fecha_pedido: Date | string;
  total: number;
  comprobante?: string | null;
  cliente_id: string;
  Productos: PedidoProducto[];
  Entrega: PedidoEntrega;
  estado_boleta: string;
  forma_pago: string;
};

type PedidoProducto = {
  id: string;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  link_foto: string;
};

type PedidoEntrega = {
  id: string;
  direccion: string;
  fecha_entrega: Date | string;
  estado_entrega: string;
};
