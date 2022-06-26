// Servidor con express
const express = require('express');
const app = express();
const PORT = 8080;

let visitas = 0;
const date = new Date();

// Llamadas GET
app.get('/', (req, res) => {
    res.send(`<h1 style='color:blue'>Bienvenidos al servidor express</h1>`);
});

app.get('/visitas', (req, res) => {
    visitas += 1
    res.send('La cantidad de visitas es ' + visitas);
});

app.get('/fyh', (req, res) => {
    res.send({fyh:
    `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()} , ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
    });
});

// Servidor y error
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));