const express = require('express');
const app = express();
const routerProductos = require('./routes/productos');
const routerCarritos = require('./routes/carritos');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));