async function updatePedido({ cone, TBK_ORDEN_COMPRA, id_estado_pedido }) {
  try {
    console.log("existoc:")
    await cone.execute(
      "UPDATE pedido SET id_estado_pedido = :newIdEstado WHERE id_pedido LIKE :id_compra",
      {
        newIdEstado: id_estado_pedido,
        id_compra: `${TBK_ORDEN_COMPRA}%`,
      }
    );
    await cone.execute("COMMIT");
    return { success: true };
  } catch (error) {
    await cone.execute("ROLLBACK");
    console.error("Error al modificar", error);
    throw error;
  }
}

export default updatePedido;
