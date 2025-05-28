import { Router } from "express";
import upload from "../middleware/filesStorage.js";
import oracledb from "oracledb";
import oracleConfig from "../config/oracleConfig.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import createOrden from "../services/createOrden.js";
import createPedidoProducto from "../services/createPedidoProducto.js";
import InsertPedidoProducto from "../services/InsertPedidoProducto.js";
import { v4 } from "uuid";
const router = Router();

//Crear pedido
router.post(
  "/compraComprobante",
  verifyToken,
  upload.single("comprobante"),
  async (req, res) => {
    let cone;
    const { products, entrega, pedido } = req.body;
    console.log(req.body);
    try {
      if (!req.file) {
        console.log("No se recibió el comprobante de pago");
        return res.status(400).json({
          error: "No se recibió el comprobante de pago",
        });
      }
      const comprobanteUrl = `/uploads/comprobantes/${req.file.filename}`;

      cone = await oracledb.getConnection(oracleConfig);
      const id = v4(); //creamos una id para todo
      //creamos el array con los productos extraidos desde la bd
      const { amount, productDetails } = await createPedidoProducto({
        cone,
        products,
      });

      //hacemos las inserciones sql
      await createOrden({
        cone,
        id,
        entrega,
        pedido,
        amount,
        id_usuario: req.user.id_usuario,
        comprobante_url: comprobanteUrl,
      });

      //insertamos los productos comprados
      await InsertPedidoProducto({ cone, productDetails, id_pedido: id });

      await cone.execute("COMMIT"); //si todo sale bien commit

      res.json({
        mensaje: "Compra solicitada exitosamente",
        pedido: id,
      });
    } catch (error) {
      if (cone) {
        try {
          await cone.execute("ROLLBACK");
        } catch (rollbackError) {
          console.error("Error en rollback:", rollbackError);
        }
      }
      console.error("Error creando transacción:", error);
      res.status(500).send("Error al crear transacción");
    } finally {
      if (cone) {
        // Verificar si la conexión existe
        try {
          await cone.close();
        } catch (closeError) {
          console.error("Error cerrando la conexión:", closeError);
        }
      }
    }
  }
);

router.get(
  ["/compraComprobante", "/compraComprobante/:id_usuario"],
  async (req, res) => {
    let cone;
    try {
      const { id_usuario } = req.params;
      cone = await oracledb.getConnection(oracleConfig);

      const response = await cone.execute(
        "SELECT * from pedidos WHERE id_usuario = :id_usuario",
        {
          id_usuario: id_usuario,
        }
      );

      res.json(response);
    } catch {
      res.status(500).json({ error: "Error al obtener pedidos" });
    } finally {
      cone.close();
    }
  }
);

export default router;
