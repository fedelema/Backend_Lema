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
const productos = new Producto();

app.use('/api/productos', routerProductos);
app.use('/api/mensajes', routerMensajes);

const {normalize, schema, denormalize} = require("normalizr");
const fs = require("fs");
const data = require("./data.json");

const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'id'});
const textSchema = new schema.Entity('texts', {
    author: authorSchema
}, {idAttribute: '_id'});

const normalizedData = normalize(data, [textSchema]);
const denormalizedData = denormalize(normalizedData.result, [textSchema], normalizedData.entities);

try {
    fs.writeFileSync('./data-normalized.json', JSON.stringify(normalizedData, null, 2), "utf-8")
} catch (err) {
    console.log(err)
}

try {
    fs.writeFileSync("./data.json", JSON.stringify(denormalizedData, null, 2), "utf-8")
} catch (err) {
    console.log(err)
}

console.log({
    original: JSON.stringify(data).length / 1024, 
    normalized: JSON.stringify(normalizedData).length / 1024,
    denormalize: JSON.stringify(denormalizedData).length / 1024, 
});

const compresionFormula = (((JSON.stringify(data).length / 1024) - (JSON.stringify(normalizedData).length / 1024)) / (JSON.stringify(data).length / 1024)) * 100;
const compresion = compresionFormula.toFixed(2);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socketServer.emit(
        events.UPDATE_MESSAGES,
        'Bienvenidos al WebSocket',
        contenedor.getAll()
    );

    socket.emit(events.PRODUCTOS_CARGADOS, productos.getAll());

    socket.emit('COMPRESION', compresion);

    socket.on(events.NUEVO_PRODUCTO, (prod) => {
        productos.save(prod);
        socketServer.emit(events.PRODUCTOS_CARGADOS, productos.getAll());
    });

    socket.on(events.POST_MESSAGE, (msg) => {
        contenedor.save(msg);
        socketServer.sockets.emit(events.NEW_MESSAGE, msg);
    });
});

app.get('/api/productos-test', async (req, res) => {
    const prods = await productos.getAll();
    const filasTabla = prods.map(
        prod => `
            <tr>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td><image src="${prod.foto}"></image></td>
            </tr>
        `
    );

    const tabla = `
        <table>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Foto</th>
            </tr>
            ${filasTabla}
        </table>`;
    console.log(tabla);
    res.send(tabla);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));