const fs = require ('fs');
const express = require('express');
const app = express();
const PORT = 8080;

let data = fs.readFileSync('./productos.txt','utf-8');
let prodsObjeto = JSON.parse(data);

function prodRandom() {
    let valor = Math.floor(Math.random()*prodsObjeto.length);
    let prod = prodsObjeto[valor];
    return prod;
}

app.get('/productos', (req, res) => {
    res.send(prodsObjeto);
});

app.get('/productoRandom', (req, res) => {
    res.send(prodRandom());
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));