// Get Endpoints
const express = require('express');
const app = express();
const PORT = 8080;

const frase = 'Hola mundo como estan';

// Llamadas GET
app.get('/api/frase', (req, res) => {
    res.json({frase: frase});
});

app.get('/api/letras/:num', (req, res) => {
    const num = parseInt(req.params.num);

    if(isNaN(num)) {
        res.json({error: "Error: el parametro no es un numero"})
        return
    }
    if(num < 1 || num > frase.length) {
        res.json({error: "Error: el numero esta fuera del rango"})
        return
    }
    
    const letra = frase[num - 1];
    res.json({letra: letra});
});

app.get('/api/palabras/:num', (req, res) => {
    const num = parseInt(req.params.num);
    const palabras = frase.split(' ');

    if(isNaN(num)) {
        res.json({error: "Error: el parametro no es un numero"})
        return
    }
    if(num < 1 || num > palabras.length) {
        res.json({error: "Error: el numero esta fuera del rango"})
        return
    }
    
    const palabraElegida = palabras[num - 1];
    res.json({palabra: palabraElegida});
});

// Servidor y error
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));