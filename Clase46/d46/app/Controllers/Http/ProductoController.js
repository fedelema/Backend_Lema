'use strict'

class ProductoController {
    async index() {
        const Producto = use('App/Models/Producto');
        return await Producto.all();
    }
}

module.exports = ProductoController
