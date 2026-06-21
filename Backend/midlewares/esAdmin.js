function esAdmin(req, res, next) {
  if (req.usuario?.roleId === 1) {
    next();
  } else {
    res.status(403).json({ error: "Acceso denegado: se requiere rol admin" });
  }
}

export default esAdmin;
