async function createOrden({ cone, id, entrega,pedido, amount, id_usuario, comprobante_url }) {
  if (!cone || !id || !entrega || !amount || !id_usuario) {
    throw new Error("Faltan parámetros requeridos");
  }

  await cone.execute(
    "INSERT INTO entrega (id_entrega,fecha_entrega,direccion_entrega,id_sucursal,id_estado_entrega,id_tipo_entrega) VALUES (:id_entrega,:fecha_entrega,:direccion_entrega,:id_sucursal,:id_estado_entrega,:id_tipo_entrega)",
    {
      id_entrega: id,
      fecha_entrega: new Date(entrega.fecha_entrega),
      direccion_entrega: entrega.direccion_entrega || "",
      id_sucursal: entrega.sucursal || "", 
      id_estado_entrega: "1", //en proceso
      id_tipo_entrega: entrega.id_tipo_entrega,
    }
  );
    await cone.execute(
    "INSERT INTO PEDIDO (ID_PEDIDO,FECHA,TOTAL,COMPROBANTE_PAGO,ID_ESTADO_PEDIDO,ID_USUARIO,ID_FORMA_PAGO,ID_ENTREGA) VALUES (:id_pedido,:fecha,:total,:comprobante_pago,:id_estado_pedido,:id_usuario,:id_forma_pago,:id_entrega)",
    {
      id_pedido: id,
      fecha: new Date(),
      total: amount,
      comprobante_pago: comprobante_url,
      id_estado_pedido: 0,
      id_usuario: id_usuario, 
      id_forma_pago: pedido.id_forma_pago,
      id_entrega: id,
    }
  );
}

export default createOrden;
