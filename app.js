const express = require('express');
const app = express();
const port = 3000;

// Configura tu servidor para servir archivos estáticos (HTML, CSS, imágenes) desde una carpeta 'public'
app.use(express.static('public'));

// Opcional: una ruta específica para responder con un mensaje o HTML
app.get('/', (req, res) => {
  res.send('¡Hola desde mi servidor con Express!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
