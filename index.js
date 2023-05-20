const express = require('express');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');
const ticketsRouter = require('./routes/tickets');
const cors = require('cors');


// Configurar body-parser para analizar el cuerpo de la solicitud

const app = express();

// Implementa el middleware cors
app.use(cors());


require('./db.js');

const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/tickets', ticketsRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

