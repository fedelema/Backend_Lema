const { Router } = require('express');
const router = Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig);
const tablaMensajes = 'mensajes';

router.get('/', async (req, res) => {
    try {
        const mensajes = await db(tablaMensajes).select();
        res.send(mensajes);
    } catch (err) {
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
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;

    if (body.email && body.mensaje) {
        const nuevoMensaje = {
            email: body.email,
            mensaje: body.mensaje,
        }

        try {
            const agregar = await db(tablaMensajes).insert(nuevoMensaje);
            res.send({...nuevoMensaje, id: agregar[0]});
        } catch (err) {
            res.send(err);
        }
    } else {
        res.status(400).send('Debe contener email y mensaje');
    }
});

router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if (body.email && body.mensaje) {
        const cambioMensaje = {
            email: body.email,
            mensaje: body.mensaje,
        }

        try {
            const cambiar = await db(tablaMensajes)
                .where({id: id})
                .update(cambioMensaje);
            res.send({...cambioMensaje, id: cambiar[0]});
        } catch (err) {
            res.send(err);
        }
    } else {
        res.status(400).send('Debe contener email y mensaje');
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
        res.send(err);
    }
});

module.exports = router;