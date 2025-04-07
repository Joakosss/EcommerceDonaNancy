import 'dotenv/config'
import express from "express";
import morgan from "morgan";
import { PORT, LINK } from "./config.js";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESSTOKENMERCADOPAGO,
});

const preference = new Preference(client);
const paymentClient = new Payment(client);

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.post("/create_order", async (req, res) => {
  const result = await preference.create({
    body: {
      items: [
        {
          id: 1,
          title: "objetoPrueba1",
          quantity: 1,
          unit_price: 10,
        },
        {
          id: 2,
          title: "objetoPrueba2",
          quantity: 1,
          unit_price: 10,
        },
      ],
      back_urls: {
        success: `${LINK}/success` /* Estas direcciones cambian cada vez que se ejecuta la cosa */,
        failure: `${LINK}/failure`,
        pending: `${LINK}/pending`,
      },
      notification_url: `${LINK}/webhook`,
      auto_return: "approved"
    },
  });
  console.log("Preferencia creada", result);
  res.json({ id: result.id, init_point: result.init_point });
});

app.get("/success", (req, res) => {
  res.send(`${LINK}/success`);
});
app.get("/failure", (req, res) => {
  res.send("Fallo");
});
app.get("/pending", (req, res) => {
  res.send("pending");
});

/* revisar esto no se que esta pasando ajdaskdajs */
app.post("/webhook", async (req, res) => {
  try {
    // Extraer parámetros de ambas formas posibles
    const paymentId = req.query["data.id"] || req.query.id;
    const notificationType = req.query.type || req.query.topic;

    console.log("🔔 Notificación recibida:", { paymentId, notificationType });

    // Solo procesar notificaciones de pagos
    if (notificationType === "payment" && paymentId) {
      console.log("🔍 Consultando pago ID:", paymentId);

      // Consultar el pago en MercadoPago
      const payment = await paymentClient.get({ id: paymentId });
      const { status, status_detail } = payment;

      console.log("📊 Estado del pago:", status);

      // Lógica según el estado
      if (status === "approved") {
        console.log("✅ Pago aprobado. Actualizando base de datos...");
        // Aquí actualizas tu DB
      } else if (status === "pending") {
        console.log("🔄 Pago pendiente:", status_detail);
      }

      return res.sendStatus(200);
    }

    // Ignorar otras notificaciones (merchant_order, etc.)
    console.log("⚠️ Notificación ignorada. Tipo:", notificationType);
    return res.sendStatus(200);
  } catch (error) {
    console.error("💥 Error en el webhook:", error.message);
    return res.status(500).json({ error: "Error al procesar el pago" });
  }
});

app.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});
