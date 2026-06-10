//Importamos el modelo de sequelize
import {DataTipes, Model} from 'sequelize';
//Importamos la conexion a la base de datos
import sequelize from '../conecction/sequealize.js';


//Lo podemos dejar para mas adelante la imcripcion de usuarios
//import bcrypt from 'bcrypt';

//Definimos el modelo de usuario
User.init(
    {
        nombre: {
            type: DataTipes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                is: /^[a-zA-Z\s]+$/i
            },
        },

        apellido: {
            type: DataTipes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                is: /^[a-zA-Z\s]+$/i
            },

        },
        email: {
            type: DataTipes.STRING(100),
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },

        password:{
            type: DataTipes.STRING(100),
            allowNull: false,
        },
    },
    //Configuracion del modelo
    {
        sequelize: sequelize,
        modelName: 'User',
    }
);

//Exportamos el modelo de usuario
export default User;

