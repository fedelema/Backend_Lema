// Motor de plantillas custom
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

app.engine('cte', (filePath, options, cb) => {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if(err) {return cb(new Error(err));}
        let rendered = content.toString();
        Object.keys(options).forEach(key => {
            if((typeof options[key]) === 'string') {
                const value = options[key];
                rendered = rendered.replace(`^^${key}$$`, value);
            };
        })
        cb(null, rendered);
    });
});

// De esta forma solo serviria para cte1 porque especifica los campos uno por uno, el anterior engine es generico
/* app.engine('cte', function (filePath, options, cb) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
        return cb(new Error(err));
        }
        const rendered = content.toString()
                                .replace('^^titulo$$', ''+ options.titulo +'')
                                .replace(`^^mensaje$$`, ''+ options.mensaje +'')
                                .replace(`^^autor$$`, ''+ options.autor +'')
                                .replace(`^^version$$`, ''+ options.version +'')
        return cb(null, rendered);
    });
});   */

app.set('views', './views');
app.set('view engine', 'cte');

app.get('/cte1', (req, res) => {
    const options = {titulo:'Algo', mensaje: 'El mensaje del titulo', autor: 'Pepe', version: '1'};

    res.render('plantilla1', options);
});

app.get('/cte2', (req, res) => {
    const fecha = new Date(Date.now()).toLocaleString();
    const options = {nombre: 'Juan', apellido:'Cito', fecha};

    res.render('plantilla2', options);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));