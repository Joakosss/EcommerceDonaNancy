export type ComprasType = {
  id_pedido: string;
  fecha: string;
  total: number;
  comprobante_pago: string;
  id_estado_pedido: string;
  id_usuario: string;
  id_forma_pago: string;
  id_entrega: string;
  entrega: {
    id_entrega: string;
    fecha_entrega: string;
    direccion_entrega: string;
    id_estado_entrega: string;
    id_tipo_entrega: string;
    sucursal: {
      id_sucursal: string;
      nombre: string;
      direccion: string;
      telefono: number;
    };
  };
  productos: [
    {
      id_pedido_producto: string;
      id_producto: string;
      cantidad: number;
      producto: {
        id_producto: string;
        nombre: string;
        precio: number;
        link_foto: string;
      };
    }
  ];
};
