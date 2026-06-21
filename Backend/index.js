import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./routes/router.js";
import sequelize from "./connection/sequelize.js";
import { notFound } from "./midlewares/notFound.js";
import { SERVER_PORT } from "./config/config.js";
import "./Models/index.js";
import { seedRoles } from "./seed/seedRoles.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(router);

await sequelize.sync({ alter: false });
await seedRoles();

app.use(notFound);

app.listen(SERVER_PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${SERVER_PORT}`);
});
