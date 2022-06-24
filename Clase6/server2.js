const express = require('express');
const app = express();
const PORT = 8102;

app.get('/', (req, res) => {
    res.send({mensaje: 'HOLA'});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));