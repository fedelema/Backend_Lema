const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const app = express();
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

const Producto = require('./utils/productos');
const productos = new Producto('./botellas.txt');
const Carrito = require('./utils/contenedor');
const carritos = new Carrito('./carritos.txt');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routerProductos = require('./routes/productos');
const routerCarritos = require('./routes/carritos');

app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);

socketServer.on('connection', (socket) => {
    socketServer.emit(
        'Bienvenidos al WebSocket',
    );

    socket.emit('PRODUCTOS_CARGADOS', productos.getAll());

    socket.on('NUEVO_PRODUCTO', (prod) => {
        productos.save(prod);
        socketServer.emit('PRODUCTOS_CARGADOS', productos.getAll());
    });

    socket.on('AGREGAR-PRODUCTO', (id) => {
        productos.getById(id);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));