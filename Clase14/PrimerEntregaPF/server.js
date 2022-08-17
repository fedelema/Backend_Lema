const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const Producto = require('./utils/productos');
const productos = new Producto('./botellas.txt');

const routerProductos = require('./routes/productos');
const routerCarritos = require('./routes/carritos');

app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));