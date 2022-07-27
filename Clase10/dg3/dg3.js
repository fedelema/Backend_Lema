// FORMULARIO + HISTORIAL
const express = require('express');
const ejs = require('ejs');
const app = express();

const personas = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        personas
    });
});

app.post('/personas', (req, res) => {
    const {nombre, apellido, edad} = req.body;
    if(nombre && apellido && edad) {
        personas.push({nombre, apellido, edad});
        res.redirect('/');
    } else {
        res.send('No se encontraron personas');
    }
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));