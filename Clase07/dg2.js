// Operaciones con el servidor
const express = require('express');
const app = express();
const PORT = 8080;

// Llamadas GET
app.get('/api/sumar/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({resultado: a + b});
});

app.get('/api/sumar', (req, res) => {
    const a = parseInt(req.query.num1);
    const b = parseInt(req.query.num2);
    res.json({resultado: a + b});
});

// NO LEE BIEN EL PARAMETRO a
app.get('/api/operacion/:a+:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        a: a,
        b: b,
        resultado: a + b});
});

// Llamadas POST, PUT, DELETE
app.post('/api', (req, res) => {
    res.json({mensaje: 'ok post'})
});

app.put('/api/:id', (req, res) => {
    res.json({mensaje: 'ok put'})
});

app.delete('/api/:id', (req, res) => {
    res.json({mensaje: 'ok delete'})
});

// Servidor y error
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));