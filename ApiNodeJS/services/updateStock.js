async function updateStock({ cone, productDetails }) {
  try {
    for (const product of productDetails) {
      await cone.execute(
        "UPDATE producto SET stock = stock - :cantidad WHERE id_producto = :id_producto",
        {
          cantidad: product.cantidad,
          id_producto: product.id,
        }
      );
    }
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar stock:", error);
    throw error;
  }
}

export default updateStock;
