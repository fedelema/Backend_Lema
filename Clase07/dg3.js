// Servidor con get, post, put, delete
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let frase = 'Frase inicial';

app.get('/api/frase', (req, res) => {
    res.json({frase: frase});
});

app.get('/api/palabras/:pos', (req, res) => {
    const pos = parseInt(req.params.pos);
    const palabras = frase.split(' ');
    const buscada = palabras[pos - 1];

    if(isNaN(pos)) {
        res.json({error: "Error: el parametro no es un numero"})
        return
    }
    if(pos < 1 || pos > palabras.length) {
        res.json({error: "Error: el numero esta fuera del rango"})
        return
    }

    res.json({
        buscada: buscada,
        posicion: pos
    });
});

app.post('/api/palabras', (req, res) => {
    const agregada = req.body.agregada;
    frase = `${frase} ${agregada}`;
    const pos = frase.split(' ').length;
    
    res.json({
        agregada: agregada,
        posicion: pos,
        frase: frase
    });
});

app.put('/api/palabras/:pos', (req, res) => {
    const palabra = req.body.palabra;
    const pos = parseInt(req.params.pos);
    let fraseDiv = frase.split(' ');
    let anterior = fraseDiv[pos - 1];
    fraseDiv[pos - 1] = palabra;
    frase = fraseDiv.join(' ');
    
    res.json({
        actualizada: palabra,
        anterior: anterior,
        posicion: pos,
        frase: frase
    });
});

app.delete('/api/palabras/:pos', (req, res) => {
    const pos = parseInt(req.params.pos);
    let fraseDiv = frase.split(' ');
    let borrar = fraseDiv[pos - 1];
    
    let fraseNueva = [];
    for(let i = 0; i < fraseDiv.length; i++) {
        if(fraseDiv[i] !== borrar) {
            fraseNueva.push(fraseDiv[i]);
        }
    }
    frase = fraseNueva.join(' ');

    res.json({
        borrada: borrar,
        frase: frase
    });
});

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));