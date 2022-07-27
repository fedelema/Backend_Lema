const express = require('express');
const app = express();

//Modulo handlebars
const handlebars = require('express-handlebars');

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials/"
});

//Configuracion de handlebars
app.engine('hbs', hbs.engine);

//Motor de la plantilla a utilizar
app.set('view engine', 'hbs');
//Directorio de los archivos de plantilla
app.set('views', './views');
//Espacio publico del servidor
app.use(express.static('public'));

fakeApi = () => [
    {name: "Katarina", lane: "midlaner"},
    {name: "Jayce", lane: "toplaner"},
    {name: "Herbert", lane: "toplaner"},
    {name: "Alan", lane: "midlaner"},
    {name: "Bob", lane: "midlaner"},
];

app.get('/', (req, res) => {
    //Sirve el cuerpo de la pagina "main.hbs" en el contenedor "index.hbs"
    res.render('main', {suggestedChamps: fakeApi(), listExists: true});
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Servidor: ${PORT}`);
});