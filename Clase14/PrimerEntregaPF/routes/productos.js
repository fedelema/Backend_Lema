const { Router } = require('express');
const router = Router();

const Producto = require('../utils/productos');
const productos = new Producto('./botellas.txt');

router.get('/:id?', (req, res) => {
    const id = req.params.id;
    if(id) {
        res.send(productos.getById(id));
        return
    } else {
        res.send(productos.getAll());
        return
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    if(body.nombre && body.descripcion && body.precio && body.foto && body.stock) {
        const nuevoProd = {
            timestamp: Date.now(),
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            foto: body.foto,
            stock: body.stock
        }
    }
    productos.save(nuevoProd);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if(body.nombre && body.descripcion && body.precio && body.foto && body.stock) {
        const prod = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            foto: body.foto,
            stock: body.stock
        }
    }
    productos.updateById(id, prod);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    productos.deleteById(id);
});

module.exports = router;