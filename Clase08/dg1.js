// Express router
const express = require('express');
const { Router } = express;
const app = express();
const routerMascotas = Router();
const routerPersonas = Router();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/mascotas', routerMascotas);
app.use('/personas', routerPersonas);

let mascotas = [];
let personas = [];

routerMascotas.get('/', (req, res) => {
    res.json({
        mascotas: mascotas
    });
});

routerPersonas.get('/', (req, res) => {
    res.json({
        personas: personas
    });
});

routerMascotas.post('/', (req, res) => {
    const nuevaMascota = req.body;
    mascotas.push(nuevaMascota);
    
    res.json({
        mensaje: `Mascota agregada con exito`
    });
});

routerPersonas.post('/', (req, res) => {
    const nuevaPersona = req.body;
    personas.push(nuevaPersona);

    res.json({
        mensaje: `Persona agregada con exito`
    });
});

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));