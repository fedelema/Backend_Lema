const { Router } = require('express');
const router = Router();

const Producto = require('../utils/productos');
const productos = new Producto('./botellas.txt');
const Carrito = require('../utils/contenedor');
const carritos = new Carrito('./carritos.txt');

router.post('/', (req, res) => {
    const productosAlCarrito = [];
    for(i=0;i<idsAgregar.length;i++) {
        const prod = productos.getById(idsAgregar[i]);
        productosAlCarrito.push(prod);
    }

    const nuevoCarrito = {
        timestamp_carrito: Date.now(),
        productos: productosAlCarrito
    }
    carritos.save(nuevoCarrito);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    carritos.deleteById(id);
});

router.get('/:id/productos', (req, res) => {
    const id = req.params.id;
    const carritoBuscado = carritos.getById(id);
    res.send(carritoBuscado.productos);
});

router.post('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = carritos.getById(id);
    const prod = productos.getById(id_prod);

    carrito.productos.push(prod);
});

router.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = carritos.getById(id);
    carrito.productos.filter(e => e.id != id_prod)

    //carrito.productos.deleteById(id_prod);
});

module.exports = router;