import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import transferenciasRouter from "./routes/transferencias.js";
import webpayRouter from "./routes/webpay.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs"); // Requiere que tengas EJS instalado o puedes reemplazar por res.send

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes c:
app.use("/transferencias", transferenciasRouter);
app.use("/webpay", webpayRouter);

//Donde se ejecuta c:
app.listen(4000, () => {
  console.log("Server ejecutandose en puerto 4000");
});
