// Fecha y hora
const fs = require('fs');

let date = new Date();
let dateString = JSON.stringify(date);
fs.writeFileSync('./fyh.txt', dateString);

let archivo = fs.readFileSync('./fyh.txt', 'utf-8');
console.log(archivo);

try {
    const dataFalsa = fs.readFileSync('./hola.txt')
} catch (err) {
    console.log(err)
}