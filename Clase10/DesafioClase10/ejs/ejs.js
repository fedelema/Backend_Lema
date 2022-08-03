const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const app = express();

//app.set('views', './views')
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

class Producto {
    constructor(title, price, thumbnail, id) {
        this.title = title,
        this.price = parseInt(price),
        this.thumbnail = thumbnail,
        this.id = id
    }
}

/* class Producto {
    constructor() {
        this.producto = [],
        this.id = id
    }
} */

let productosCargados = [];

app.get('/productos', (req, res) => {
    const data = fs.readFileSync('./botellas.txt', 'utf-8');
    productosCargados = JSON.parse(data);
    
    res.render(
        'index', {productosCargados: productosCargados}
    );
});

app.post('/productos', (req, res) => {
    const data = fs.readFileSync('./botellas.txt', 'utf-8');
    const dataParseada = JSON.parse(data);
    
    const prod = new Producto(req.body.title, req.body.price, req.body.thumbnail);
    prod.id = dataParseada.length + 1;
    dataParseada.push(prod);
    const dataString = JSON.stringify(dataParseada);

    fs.writeFile('./botellas.txt', dataString, error => {
        if (error) {console.log(error)}
        else {console.log('Guardado correctamente')}
    })
    
    res.json({
        mensaje: `Producto agregado con exito con id:${prod.id}`
    });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));