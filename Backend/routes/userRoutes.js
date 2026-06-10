//Importamos las dependencias necesarias
import { Router } from "express";
import userController from "../controllers/userController.js";

//por el momento no vamos a implementar la autenticacion, pero lo dejamos para mas adelante
import autenticar from "../middleware/autenticar.js";

//Creamos una instancia del router de express
const userRouter = Router();

//Definimos las rutas para los usuarios
userRouter.get('/users', autenticar, userController.obtenerTodosLosUsuarios);
userRouter.get('/users/:id', autenticar, userController.obtenerUsuarioPorId);
userRouter.post('/users', userController.crearUsuario);
userRouter.put('/users/:id', autenticar, userController.actualizarUsuario);
userRouter.delete('/users/:id', autenticar, userController.eliminarUsuario);

//Exportamos el router para poder usarlo en el index.js
export default userRouter;