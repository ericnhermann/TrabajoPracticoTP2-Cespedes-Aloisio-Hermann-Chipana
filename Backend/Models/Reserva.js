//Importamos el modelo de sequelize
import {DataTypes, Model} from 'sequelize';
//Importamos la conexion a la base de datos
import sequelize from '../connection/sequelize.js';

class Reserva extends Model{}

//Definimos el modelo de Reserva


Reserva.init(
    {
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                isDate: true
            },
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                is: /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
            },
        },
        estado: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3, 50],
                is: /^[a-zA-Z\s]+$/i
            },
        },
        precio: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate:{
                isDecimal: true
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
                
    },
    //Configuracion del modelo 
    {
        sequelize: sequelize,
        modelName: 'Reserva',
    }
);
//Exportamos el modelo de Reserva
export default Reserva;


        
