import { Router } from "express";
import { Role } from "../Models/index.js";
import autenticar from "../midlewares/autenticar.js";
import esAdmin from "../midlewares/esAdmin.js";

const rolesRoutes = Router();

rolesRoutes.get("/", autenticar, esAdmin, async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

rolesRoutes.get("/:id", autenticar, esAdmin, async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      attributes: ["id", "name"],
    });
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default rolesRoutes;
