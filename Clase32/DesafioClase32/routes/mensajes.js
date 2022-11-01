const { Router } = require('express');
const router = Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig);
const tablaMensajes = 'mensajes';
const loggerWinston = require('../logger_config');
const logger = loggerWinston;

router.get('/', async (req, res) => {
    try {
        const mensajes = await db(tablaMensajes).select();
        res.send(mensajes);
    } catch (err) {
        logger.log('error', 'Error al traer mensajes');
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const mensaje = await db(tablaMensajes)
            .select()
            .where({id: id});
        res.send(mensaje);
    } catch (err) {
        logger.log('error', 'Error al traer mensajes');
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;

    if (body.email && body.text && body.nombre && body.apellido && body.edad && body.alias && body.avatar) {
        const nuevoMensaje = {
            author: {
                id: body.email,
                nombre: body.nombre,
                apellido: body.apellido,
                edad: body.edad,
                alias: body.alias,
                avatar: body.avatar,
            },
            text: body.text
        }

        try {
            const agregar = await db(tablaMensajes).insert(nuevoMensaje);
            res.send({...nuevoMensaje, id: agregar[0]});
        } catch (err) {
            logger.log('error', 'Error al traer mensajes');
            res.send(err);
        }
    } else {
        res.status(400).send('Debe contener todos los campos');
    }
});

router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if (body.email && body.text && body.nombre && body.apellido && body.edad && body.alias && body.avatar) {
        const cambioMensaje = {
            author: {
                id: body.email,
                nombre: body.nombre,
                apellido: body.apellido,
                edad: body.edad,
                alias: body.alias,
                avatar: body.avatar,
            },
            text: body.text
        }

        try {
            const cambiar = await db(tablaMensajes)
                .where({id: id})
                .update(cambioMensaje);
            res.send({...cambioMensaje, id: cambiar[0]});
        } catch (err) {
            logger.log('error', 'Error al modificar mensajes');
            res.send(err);
        }
    } else {
        res.status(400).send('Debe contener todos los campos');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await db(tablaMensajes)
            .where({id: id})
            .del();
        res.send('Mensaje eliminado con id:'+id);
    } catch (err) {
        logger.log('error', 'Error al borrar mensajes');
        res.send(err);
    }
});

module.exports = router;