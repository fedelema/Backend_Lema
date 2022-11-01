const { Router } = require('express');
const router = Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig);
const tablaProd = 'productos';
const loggerWinston = require('../logger_config');
const logger = loggerWinston;

router.get('/', async (req, res) => {
    try {
        const productos = await db(tablaProd).select();
        res.send(productos);
    } catch (err) {
        logger.log('error', 'Error al traer productos');
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await db(tablaProd)
            .select()
            .where({id: id});
        res.send(producto);
    } catch (err) {
        logger.log('error', 'Error al traer productos');
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;

    if(body.nombre && body.precio && body.foto) {
        const nuevoProd = {
            nombre: body.nombre,
            precio: body.precio,
            foto: body.foto
        }

        try {
            const agregar = await db(tablaProd).insert(nuevoProd);
            res.send({...nuevoProd, id: agregar[0]});
        } catch (err) {
            logger.log('error', 'Error al guardar productos');
            res.send(err);
        }
    } else {
        res.status(400).send('Debe contener nombre, precio y foto');
    }
});

router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if (body.nombre && body.precio && body.foto) {
        const cambioProd = {
            nombre: body.nombre,
            precio: body.precio,
            foto: body.foto
        }

        try {
            const cambiar = await db(tablaProd)
                .where({id: id})
                .update(cambioProd);
            res.send({...cambioProd, id: cambiar[0]});
        } catch (err) {
            logger.log('error', 'Error al modificar productos');
            res.send(err);
        }
    } else {
        res.status(400).send('Debe contener nombre, precio y foto');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await db(tablaProd)
            .where({id: id})
            .del();
        res.send('Producto eliminado con id:'+id);
    } catch (err) {
        logger.log('error', 'Error al borrar productos');
        res.send(err);
    }
});

module.exports = router;