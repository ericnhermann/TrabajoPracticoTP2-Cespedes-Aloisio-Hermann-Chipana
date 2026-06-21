import { Sequelize } from "sequelize";
import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../config/config.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
});

try {
  await sequelize.authenticate();
  console.log("Conectado a la base de datos");
} catch (error) {
  console.error("No se pudo conectar a la base de datos", error);
}

export default sequelize;
