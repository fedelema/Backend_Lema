const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index', {
        mensaje: 'Hola EJS'
    });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));