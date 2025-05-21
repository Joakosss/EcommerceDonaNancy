async function createPedidoProducto({ cone, products }) {
  const productDetails = [];
  let amount = 0; // Inicializamos el monto total

  for (const item in products) {
    const result = await cone.execute(
      "SELECT id_producto,nombre,precio,stock FROM producto WHERE id_producto = :id",
      { id: item.id_producto }
    );

    if (result.rows.length === 0) {
      throw new Error(`Producto con ID ${item.id} no encontrado`);
    }

    const product = result.rows[0];

    // Verificamos si hay suficiente stock
    if (product.STOCK < item.cantidad) {
      throw new Error(`Stock insuficiente para el producto ${product.NOMBRE}`);
    }

    const subtotal = product.precio * item.cantidad;
    amount += subtotal;

    productDetails.push({
      id: product.ID_PRODUCTO,
      nombre: product.NOMBRE,
      precio: product.PRECIO,
      cantidad: item.cantidad,
      subtotal,
    });
  }
  return { productDetails, amount };
}

export default createPedidoProducto;
