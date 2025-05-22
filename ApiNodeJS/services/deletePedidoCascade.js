async function deletePedidoCascade({ cone, TBK_ORDEN_COMPRA }) {
  try {
    // 1. Primero eliminamos los registros hijos (pedido_producto)
    await cone.execute(
      "DELETE FROM pedido_producto WHERE id_pedido LIKE :id_compra",
      {
        id_compra: `${TBK_ORDEN_COMPRA}%`,
      }
    );
    // 3. Finalmente eliminamos el pedido principal
    await cone.execute("DELETE FROM pedido WHERE id_pedido LIKE :id_compra", {
      id_compra: `${TBK_ORDEN_COMPRA}%`,
    });

    // 2. Luego eliminamos las entregas
    await cone.execute("DELETE FROM entrega WHERE id_entrega LIKE :id_compra", {
      id_compra: `${TBK_ORDEN_COMPRA}%`,
    });

    await cone.execute("COMMIT");
    return { success: true };
  } catch (error) {
    await cone.execute("ROLLBACK");
    console.error("Error al eliminar pedido en cascada:", error);
    throw error;
  }
}

export default deletePedidoCascade;
