// EJS
const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

// Peticion: http://localhost:8102/datos?min=1&max=10&nivel=8&titulo=Medidor
app.get('/datos', (req, res) => {
    const {
        titulo, 
        min,
        max,
        nivel
    } = req.query;
    
    res.render('index', {
        titulo: titulo,
        min: min,
        max: max,
        nivel: nivel
    });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));