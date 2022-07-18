const fs = require('fs');
const express = require('express');
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/productos', router);

class Producto {
    constructor(title, price, thumbnail, id) {
        this.title = title,
        this.price = parseInt(price),
        this.thumbnail = thumbnail,
        this.id = id
    }
}

router.get('/', (req, res) => {
    const data = fs.readFileSync('./botellas.txt', 'utf-8');
    dataParseada = JSON.parse(data);
    
    res.json({
        productos: dataParseada
    });
});

router.get('/:id', (req, res) => {
    const data = fs.readFileSync('./botellas.txt', 'utf-8');
    const dataParseada = JSON.parse(data);
    
    const id = parseInt(req.params.id);

    if(isNaN(id) || id < 1 || id > dataParseada.length) {
        res.json({error: 'producto no encontrado'})
        return
    }

    const elegido = dataParseada[id - 1];
    res.json({
        producto: elegido
    });
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    const data = fs.readFileSync('./botellas.txt', 'utf-8');
    const dataParseada = JSON.parse(data);
    
    const id = parseInt(req.params.id);
    const filtrado = dataParseada.filter(item => item.id != id);
    console.log(filtrado);
    
    let title = req.body.title;
    let price = req.body.price;
    let thumbnail = req.body.thumbnail;

    const prod = {title, price, thumbnail, id};
    filtrado.push(prod);
    console.log(prod);

    const dataString = JSON.stringify(filtrado);

    fs.writeFile('./botellas.txt', dataString, error => {
        if (error) {console.log(error)}
        else {console.log('Guardado correctamente')}
    })
    
    res.json({
        mensaje: `Producto con id:${id} modificado con exito`
    });
});

router.delete('/:id', (req, res) => {
    const data = fs.readFileSync('./botellas.txt', 'utf-8');
    const dataParseada = JSON.parse(data);

    const id = parseInt(req.params.id);
    let filtrado = dataParseada.filter(item => item.id != id);
    const dataString = JSON.stringify(filtrado);

    fs.writeFile('./botellas.txt', dataString, error => {
        if (error) {console.log(error)}
        else {console.log('Borrado correctamente')}
    })

    res.json({
        mensaje: `Producto con id:${id} eliminado con exito`
    });
});

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));