import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const ALGORITHM = process.env.ALGORITHM;

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] });
    req.user = {
      id_usuario: decoded.sub,
      autorization: decoded.autorization,
    };
    // Verificamos si el token ha expirado
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ error: "Token expirado" });
    }
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};
