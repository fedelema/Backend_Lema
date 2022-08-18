const { Router } = require('express');
const router = Router();

const Producto = require('../utils/productos');
const productos = new Producto('./botellas.txt');
const Carrito = require('../utils/contenedor');
const carritos = new Carrito('./carritos.txt');

router.post('/', (req, res) => {
    const nuevoCarrito = {
        timestamp_carrito: Date.now(),
        productos: []
    }
    carritos.save(nuevoCarrito);

    res.redirect('/')
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    carritos.deleteById(id);
    
    res.redirect('/')
});

router.get('/:id/productos', (req, res) => {
    const id = parseInt(req.params.id);
    const carritoBuscado = carritos.getById(id);
    res.send(carritoBuscado.productos);
});

router.post('/:id/productos/:id_prod', (req, res) => {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carrito = carritos.getById(id);
    const prod = productos.getById(id_prod);
    carrito.productos.push(prod);
    carritos.updateById(id, carrito);

    res.redirect('/')
});

router.delete('/:id/productos/:id_prod', (req, res) => {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carrito = carritos.getById(id);
    carrito.productos = carrito.productos.filter(e => e.id != id_prod);
    carritos.updateById(id, carrito);

    res.redirect('/')
});

module.exports = router;