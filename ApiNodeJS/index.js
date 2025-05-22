import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import transferenciasRouter from "./routes/transferencias.js";
import webpayRouter from "./routes/webpay.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs"); // Requiere que tengas EJS instalado o puedes reemplazar por res.send
app.use("/api/comprobantes", express.static("files/comprobantes"));

//Routes c:
app.use("/transferencias", transferenciasRouter);
app.use("/webpay", webpayRouter);

//Donde se ejecuta c:
app.listen(4000, () => {
  console.log("Server ejecutandose en puerto 4000");
});
