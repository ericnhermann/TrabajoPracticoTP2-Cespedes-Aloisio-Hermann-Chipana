import {Sequelize} from "sequelize";

const sequelize = new Sequelize("lavadero","root","",{
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});


try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
}catch (error){
    console.error("No se pudo conectar a la base de datos", error);
}

export default sequelize;