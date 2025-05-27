import WebpayPlus from "../config/webpayConfig.js"; //importamos la configuracion de webpay

async function createWebpayTransaction({ req, id, amount }) {
  const returnUrl = `${req.protocol}://${req.get("host")}/webpay/commit`;
  const sessionId = "SES-" + id.substring(0, 8); //id unica para la session con parte de mi id
  const buyOrder = id.substring(0, 25); // Usamos el id para el buyOrder

  const { token, url } = await new WebpayPlus.Transaction().create(
    buyOrder,
    sessionId,
    amount,
    returnUrl
  );

  return { url, token };
}

export default createWebpayTransaction;
