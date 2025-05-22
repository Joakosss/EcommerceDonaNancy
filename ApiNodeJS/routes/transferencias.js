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

//subir la imagen
router.post("/comprobantes", upload.single("comprobante"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No se recibio archivo :C",
      });
    }
    //ubicacion de la imagen en los datos c:
    const comprobanteUrl = `/uploads/comprobantes/${req.file.filename}`;

    res.json({
      message: "Comprobante subido exitosamente",
      url: comprobanteUrl,
      nombreArchivo: req.file.filename,
    });
  } catch (error) {
    console.error("Error al subir imagen:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

//Crear pedido
router.post("/compraComprobante", verifyToken, async (req, res) => {
  let cone;
  const { products, entrega } = req.body;
  try {
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
      amount,
      id_usuario: req.user.id_usuario,
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
    await cone.close();
  }
});

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
