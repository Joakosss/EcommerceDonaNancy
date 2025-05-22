import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { v4 } from "uuid"; // generador de ids v4
import oracledb from "oracledb";
import oracleConfig from "../config/oracleConfig.js";
import createOrden from "../services/createOrden.js";
import createWebpayTransaction from "../services/createWebpayTransaction.js";
import WebpayPlus from "../config/webpayConfig.js"; //importamos la configuracion de webpay
import createPedidoProducto from "../services/createPedidoProducto.js";
import InsertPedidoProducto from "../services/InsertPedidoProducto.js";
import deletePedidoCascade from "../services/deletePedidoCascade.js";
import updatePedido from "../services/updatePedido.js";

const router = Router();

router.post("/create", verifyToken, async (req, res) => {
  let cone;
  const { products, entrega, pedido } = req.body; // rescatamos todo lo que biene en el body del metodo post
  try {
    const id = v4(); //creamos una id para todo
    cone = await oracledb.getConnection(oracleConfig);

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
      pedido,
    });
    await InsertPedidoProducto({ cone, productDetails, id_pedido: id });

    await cone.execute("COMMIT"); //si todo sale bien commit

    //hacemos el link en webpay
    const webpayResponse = await createWebpayTransaction({ req, id, amount });

    // Redirige al formulario de pago
    res.json({ url: webpayResponse.url, token: webpayResponse.token });
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
    cone.close();
  }
});

// Ruta para recibir el retorno del formulario Webpay
router.get("/commit", async (req, res) => {
  const { token_ws, TBK_TOKEN, TBK_ORDEN_COMPRA } = req.query;
  let cone;
  //token_ws	        Token generado al crear la transacción (si fue exitosa).
  //TBK_TOKEN	        Token usado en transacciones canceladas.
  //TBK_ORDEN_COMPRA	Código de la orden de compra en caso de cancelación.          usar este para eliminar
  //TBK_ID_SESION	    ID de sesión en caso de cancelación o timeout.

  try {
    cone = await oracledb.getConnection(oracleConfig);
    if (token_ws && !TBK_TOKEN) {
      const commitResponse = await new WebpayPlus.Transaction().commit(
        token_ws
      );
      const { status, buy_order } = commitResponse;
      // Flujo 1: Éxito

      if (status === "AUTHORIZED") {
        await updatePedido({
          cone,
          TBK_ORDEN_COMPRA: buy_order,
          id_estado_pedido: 3,
        });
        console.log("✅ Transacción aprobada.");
        res.redirect(`http://localhost:5173/success/${buy_order}`);
        return;
      }
      if (status === "FAILED") {
        await deletePedidoCascade({ cone, TBK_ORDEN_COMPRA });
        console.log("❌ Medio de pago rechazado.");
        res.redirect("http://localhost:5173/failure/pagoRechazado");
        return;
      }
      console.log("❌ Transacción invalida (error desconocido).");
      res.redirect("http://localhost:5173/failure/error");
      return;
    } else if (!token_ws && !TBK_TOKEN) {
      await deletePedidoCascade({ cone, TBK_ORDEN_COMPRA });
      console.log("⌛ El pago fue anulado por tiempo de espera.");
      res.redirect("http://localhost:5173/failure/pagoAbandonado");
      return;
    } else if (!token_ws && TBK_TOKEN) {
      await deletePedidoCascade({ cone, TBK_ORDEN_COMPRA });
      console.log("❌ El pago fue cancelado por el usuario.");
      res.redirect("http://localhost:5173/failure/pagoAbandonado");
      return;
    } else {
      await deletePedidoCascade({ cone, TBK_ORDEN_COMPRA });
      console.log("⚠️ Transacción inválida o abandonada.");
      res.redirect("http://localhost:5173/failure/pagoAbandonado");
      return;
    }
  } catch (error) {
    console.error("Error en commit:", error);
    res.redirect("http://localhost:5173/failure/error");
  } finally {
    cone.close();
  }
});

export default router;
