const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routerMensajes = require('./routes/mensajes');
const routerProductos = require('./routes/productos');
const { Server: HTTPServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

const events = require('./socket_events');
const Contenedor = require('./utils/contenedor');
const Producto = require('./utils/productos');
const contenedor = new Contenedor('./data.json');
const productos = new Producto('./botellas.txt');
const messages = contenedor.getAll();
const productosCargados = productos.getAll();

app.use('/api/productos', routerProductos);
app.use('/api/mensajes', routerMensajes);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socketServer.emit(
        events.UPDATE_MESSAGES,
        'Bienvenidos al WebSocket',
        messages
    );

    socket.emit(events.PRODUCTOS_CARGADOS, productos.getAll());

    socket.on(events.NUEVO_PRODUCTO, (prod) => {
        productos.save(prod);
        socketServer.emit(events.PRODUCTOS_CARGADOS, productos.getAll());
    });

    socket.on(events.POST_MESSAGE, (msg) => {
        const _msg = {
            ...msg, socket_id: socket.id, likes: 0, date: Date.now()
        }
        contenedor.save(_msg);
        socketServer.sockets.emit(events.NEW_MESSAGE, _msg);
    });

    socket.on(events.LIKE_MESSAGE, (msgId) => {
        const msg = contenedor.getById(msgId);
        msg.likes++;
        contenedor.updateById(msgId, msg);
        socketServer.sockets.emit(
            events.UPDATE_MESSAGES,
            'Los mensajes se actualizaron',
            contenedor.getAll()
        );
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

const PORT = process.env.PORT || 3000;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));