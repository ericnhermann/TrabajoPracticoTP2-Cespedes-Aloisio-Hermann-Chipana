//Importamos el modelo de sequelize
import {DataTypes, Model} from 'sequelize';
//Importamos la conexion a la base de datos
import sequelize from '../connection/sequelize.js';


//Lo podemos dejar para mas adelante la imcripcion de usuarios
//import bcrypt from 'bcrypt';

class User extends Model{}

//Definimos el modelo de usuario
User.init(
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                is: /^[a-zA-Z\s]+$/i
            },
        },

        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                is: /^[a-zA-Z\s]+$/i
            },

        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },

        password:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
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

