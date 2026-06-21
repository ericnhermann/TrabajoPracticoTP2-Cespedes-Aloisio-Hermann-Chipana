import Router from "express";
import userController from "../containers/userContainer.js";
import autenticar from "../midlewares/autenticar.js";
import esAdmin from "../midlewares/esAdmin.js";

const userRoutes = Router();

// Públicas
userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.crearUsuario);

// Cualquier usuario autenticado
userRoutes.get("/me", autenticar, userController.me);

// Solo admin
userRoutes.get("/", autenticar, esAdmin, userController.obtenerTodosLosUsuarios);
userRoutes.get("/:id", autenticar, esAdmin, userController.obtenerUsuarioPorId);
userRoutes.put("/:id", autenticar, esAdmin, userController.actualizarUsuario);
userRoutes.delete("/:id", autenticar, esAdmin, userController.eliminarUsuario);

export default userRoutes;
