// Handlebars con express
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
});

app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    const user = {
        nombre: 'Fede',
        apellido: 'Lema',
        edad: 25,
        telefono: 1234,
        email: 'fede@fede.com'
    }
    res.render('main', user);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
})