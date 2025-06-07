const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const { mongoURI } = require('./config/index.js');

//contectar a Mongo DB
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.log(error));

const { verifyToken } = require('./middleware/auth.js');

// Importar rutas
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/product.js');

app.use('/api/users', verifyToken, userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const path = require('path');

app.get('/', (req, res) => {
  res.status(200).send('¡Bienvenido a la API de productos!');
});

app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});