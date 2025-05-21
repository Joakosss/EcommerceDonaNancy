import { v4 } from "uuid"; // generador de ids v4

async function InsertPedidoProducto({ cone, productDetails,id_pedido }) {
  for (const product of productDetails) {
    await cone.execute(
      `INSERT INTO pedido_producto (
        id_pedido_producto,
        cantidad, 
        fecha, 
        valor_unidad, 
        id_pedido, 
        id_producto
      ) VALUES (
        :id, 
        :cantidad, 
        SYSDATE, 
        :valor_unidad, 
        :id_pedido, 
        :id_producto)`,
      {
        id: v4(), // ID único para cada registro en la tabla pedido_producto
        cantidad: product.cantidad,
        valor_unidad: product.precio,
        id_pedido: id_pedido,
        id_producto: product.id,
      }
    );
  }
}

export default InsertPedidoProducto;
