//Este es el index.js principal
import express from 'express';
import router from './routes/router.js';
import sequelize from './connection/sequelize.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Preguntar sobre esto al profe

app.use(router);

await sequelize.sync({alter: false});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

