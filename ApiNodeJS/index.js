import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 } from "uuid"; // generador de ids v4
import oracledb from "oracledb";
import oracleConfig from "./config/oracleConfig.js";
import getDate from "./utils/date.js";
import WebpayPlus from "./config/webpayConfig.js"; //importamos la configuracion de webpay
import db from "./config/posgresConfig.js"; //importamos la configuracion de la bd

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs"); // Requiere que tengas EJS instalado o puedes reemplazar por res.send

app.post("/webpay/create", async (req, res) => {
  let cone;
  const { amount, products } = req.body; // rescatamos todo lo que biene en el body del metodo post
  try {
    const id = v4(); //creamos una id para el pago
    cone = await oracledb.getConnection(oracleConfig);
    await cone.execute(
      "INSERT INTO PEDIDO (ID_PEDIDO,FECHA,TOTAL,COMPROBANTE,ID_ESTADO_PEDIDO,ID_USUARIO,ID_FORMA_PAGO,ID_ENTREGA) VALUES (${id},${fecha},${total},${comprobante},${id_estado_pedido},${id_usuario},${id_forma_pago},${id_entrega})",
      {id_pedido:id,
        fecha:getDate(),
        total:amount, 
        comprobante:null,
        id_estado_pedido:0,
        id_usuario:1, //debemos tener el id del usuario
        id_forma_pago:0, 
        id_entrega:id, // se supone debemos crear entrega cuando ya se pague por ende debemos modificar la bd para que sea null
      }
    );
  } catch (error) {}
  //primero creamos el pedido con el estado en pendiente de pago
  await db.none(
    "INSERT INTO PEDIDO (id,fecha,total,comprobante,id_estado_boleta) VALUES (${id},${fecha},${total},${comprobante},$(id_estado_boleta))",
    {
      id: id,
      fecha: getDate(),
      total: 10000,
      comprobante: null,
      id_estado_boleta: "1",
    }
  );

  const sessionId = "SES-" + Math.floor(Math.random() * 100000); //id unica para la session
  const returnUrl = `${req.protocol}://${req.get("host")}/webpay/commit`;

  /* Consulta de los productos a la bd */
  const ids = products.map((product) => product.id).join(",");
  console.log(`http://localhost:3000/products/?id_producto=${ids}`);
  //console.log(productsResponse);
  /*   try {
    const productsResponse = await axios.get(
      `http://localhost:3000/products/?id_producto=${ids}`
    );
  } catch (error) {
    console.log("error aqui")
  } */

  try {
    const { token, url } = await new WebpayPlus.Transaction().create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );
    // Redirige al formulario de pago
    res.json({ url: url, token: token });
  } catch (error) {
    console.error("Error creando transacción:", error);
    res.status(500).send("Error al crear transacción");
  }
});

// Ruta para recibir el retorno del formulario Webpay
app.get("/webpay/commit", async (req, res) => {
  const { token_ws, TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION } = req.query;
  //token_ws	        Token generado al crear la transacción (si fue exitosa).
  //TBK_TOKEN	        Token usado en transacciones canceladas.
  //TBK_ORDEN_COMPRA	Código de la orden de compra en caso de cancelación.
  //TBK_ID_SESION	    ID de sesión en caso de cancelación o timeout.

  try {
    if (token_ws && !TBK_TOKEN) {
      // Flujo 1: Éxito
      const commitResponse = await new WebpayPlus.Transaction().commit(
        token_ws
      );
      const { status } = commitResponse;

      if (status === "AUTHORIZED") {
        console.log("✅ Transacción aprobada.");
        res.redirect("http://localhost:5173/success");
        return;
      }
      if (status === "FAILED") {
        console.log("❌ Medio de pago rechazado.");
        res.redirect("http://localhost:5173/failure/pagoRechazado");
        return;
      }
      console.log("❌ Transacción invalida (error desconocido).");
      res.redirect("http://localhost:5173/failure/error");
      return;
    } else if (!token_ws && !TBK_TOKEN) {
      // Flujo 2: Timeout
      mensaje = "⌛ El pago fue anulado por tiempo de espera.";
      res.redirect("http://localhost:5173/failure/pagoAbandonado");
      return;
    } else if (!token_ws && TBK_TOKEN) {
      // Flujo 3: Usuario canceló
      console.log("❌ El pago fue cancelado por el usuario.");
      res.redirect("http://localhost:5173/failure/pagoAbandonado");
      return;
    } else {
      // Flujo 4: Pago inválido
      console.log("⚠️ Transacción inválida o abandonada.");
      res.redirect("http://localhost:5173/failure/pagoAbandonado");
      return;
    }
  } catch (error) {
    console.error("Error en commit:", error);
    res.status(500).send("Error al confirmar transacción");
  }
});

app.post("/prueba", async (req, res) => {
  const { compra } = req.body;
  try {
    const id = await db.one(
      "INSERT INTO PEDIDO (id,fecha,total,comprobante,id_estado_boleta) VALUES ($(id),$(fecha),$(total),$(comprobante),$(id_estado_boleta)) RETURNING id",
      {
        id: id,
        fecha: getDate(),
        total: 10000,
        comprobante: null,
        id_estado_boleta: "1",
      }
    );

    console.log(response);

    res.status(201).send({ message: "creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Hubo un error" });
  }
});

/* Borrar */
app.get("/", async (req, res) => {
  let cone;
  try {
    cone = await oracledb.getConnection(oracleConfig);
    const response = await cone.execute("SELECT * FROM producto");
    res.status(200).json(
      response.rows.map((row) => ({
        nombre: row[1],
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (cone) cone.close();
  }
});
/* Borrar */
app.listen(4000, () => {
  console.log("Server ejecutandose en puerto 4000");
});
