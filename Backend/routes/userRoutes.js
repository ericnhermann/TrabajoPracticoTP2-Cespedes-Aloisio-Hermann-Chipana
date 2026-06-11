//Importamos las dependencias necesarias
import Router from "express";
import userController from "../containers/UserContainer.js";

//por el momento no vamos a implementar la autenticacion, pero lo dejamos para mas adelante
//import autenticar from "../middleware/autenticar.js";

//Creamos una instancia del router de express
const userRoutes = Router();

//Definimos las rutas para los usuarios
userRoutes.get('/users', userController.obtenerTodosLosUsuarios);
userRoutes.get('/users/:id', userController.obtenerUsuarioPorId);
userRoutes.post('/users', userController.crearUsuario);
userRoutes.put('/users/:id', userController.actualizarUsuario);
userRoutes.delete('/users/:id', userController.eliminarUsuario);

//Exportamos el router para poder usarlo en el index.js
export default userRoutes;