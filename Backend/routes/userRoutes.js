import Router from "express";
import userController from "../containers/userContainer.js";
import autenticar from "../midlewares/autenticar.js";

const userRoutes = Router();

// Públicas
userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.crearUsuario);

// Protegidas (JWT en cookie o header Authorization)
userRoutes.get("/me", autenticar, userController.me);
userRoutes.get("/", autenticar, userController.obtenerTodosLosUsuarios);
userRoutes.get("/:id", autenticar, userController.obtenerUsuarioPorId);
userRoutes.put("/:id", autenticar, userController.actualizarUsuario);
userRoutes.delete("/:id", autenticar, userController.eliminarUsuario);

export default userRoutes;
