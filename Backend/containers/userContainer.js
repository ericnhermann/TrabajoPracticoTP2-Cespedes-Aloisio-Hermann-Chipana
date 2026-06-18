import UserController from "../controllers/UserController.js";
//Importamos el modelo de usuario
import {User} from "../Models/index.js";
import UserService from "../services/UserService.js";

//Creamos una instancia del servicio de usuario (que se llama userService), pasandole el modolo de usuario (que se llama User)
const userService = new UserService(User);
//Creamos una instancia del controlador de usuario, pasandole el servicio de usuario(que se llama userService)
const userController = new UserController(userService);



//Exportamos el controlador de usuario para poder usarlo en las rutas
export default userController;