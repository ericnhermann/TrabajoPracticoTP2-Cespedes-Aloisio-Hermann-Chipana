import { verifyToken } from "../utils/jwt.js";

function autenticar(req, res, next) {
  const token =
    req.cookies?.payload ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    req.usuario = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export default autenticar;
