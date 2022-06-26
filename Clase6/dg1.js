// Servidor en Node
const http = require('http');

// Obtengo la fecha y la hora
const fecha = new Date();
const fechaString = new Date().toString();
const hora = fecha.getHours();
console.log(hora);

// Genero una función que salude según la hora
function saludo() {
    if(hora <= 5 || hora >= 20) {
        return 'Buenas noches!'}
    else if(6 <= hora && hora <= 12) {
        return 'Buenos días!'}
    else if(13 <= hora && hora <= 19) {
        return 'Buenas tardes!'}
}

// Llamo a la función desde la respuesta
const server = http.createServer((req, res) => {
    res.end(saludo());
})

const connectedServer = server.listen(8101, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
})