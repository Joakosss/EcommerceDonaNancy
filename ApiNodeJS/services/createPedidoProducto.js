async function createPedidoProducto({ cone, products }) {
  const productDetails = [];
  let amount = 0; // Inicializamos el monto total
  let counter = 0;

  for (const item of products) {
    const result = await cone.execute(
      "SELECT id_producto,nombre,precio,stock FROM producto WHERE id_producto = :id",
      { id: item.id_producto }
    );
    if (result.rows.length === 0) {
      throw new Error(`Producto con ID ${item.id_producto} no encontrado`);
    }

    const product = result.rows[0];

    // Verificamos si hay suficiente stock
    if (product[3] < item.cantidad) {
      throw new Error(`Stock insuficiente para el producto ${product[1]}`);
    }
    counter += item.cantidad;
    const subtotal = product[2] * item.cantidad;
    amount += subtotal;

    productDetails.push({
      id: product[0],
      nombre: product[1],
      precio: product[2],
      cantidad: item.cantidad,
      subtotal,
    });
  }
  return { productDetails, amount , counter};
}

export default createPedidoProducto;
