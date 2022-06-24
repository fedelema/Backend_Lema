// DESAFIO 1 - NUMEROS ALEATORIOS
/* function obtenerAleatorios() {
    
    let array=[];

    function getRandomInt(min,max) {
        return Math.floor(Math.random()*(max-min)+min); 
    }

    for(i=0;i<10000;i++){
        let numAleatorio = getRandomInt(1,21);
        array.push(numAleatorio);
    }

    let repetidos = {};
    array.forEach(function(numero) {
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    console.log(repetidos);
}
obtenerAleatorios(); */


//DESAFIO 2 - ARRAY DE OBJETOS
/* const productos = [
    {id:1, nombre:'lapiz', precio:15.75},
    {id:2, nombre:'goma', precio:42.33},
    {id:3, nombre:'cuaderno', precio:125.25},
    {id:4, nombre:'regla', precio:110.10},
    {id:5, nombre:'mochila', precio:580.50}
];

let arrayFinal = [];

function nombresProductos() {
    let nombres = productos.map(i => i.nombre);
    console.log('Nombres de productos: ' + nombres);
    arrayFinal.push(nombres);
}
nombresProductos();

function precioTotalyPromedio() {
    let total = 0;
    for(i=0; i<productos.length; i++) {
        total += productos[i].precio;
    }
    console.log('Precio total: ' + total);

    let promedio = total/productos.length;
    console.log('Precio promedio: ' + promedio);

    arrayFinal.push(total);
    arrayFinal.push(promedio);
}
precioTotalyPromedio();

function preciosMenorMayor() {
    let arrayPrecios = productos.map(i => i.precio);
    console.log(arrayPrecios);

    let minimo = Math.min(...arrayPrecios);
    console.log('Precio minimo: ' + minimo);

    let maximo = Math.max(...arrayPrecios);
    console.log('Precio maximo: ' + maximo);

    arrayFinal.push(minimo);
    arrayFinal.push(maximo);
}
preciosMenorMayor();

console.log(arrayFinal); */

//DESAFIO 3 - CALCULADORA DE EDAD
const moment = require("moment");

function fechas() {
    let hoy = moment().format('DD/MM/YYYY');
    let naci = moment("19961101", "YYYYMMDD").format('DD/MM/YYYY');
    console.log('Hoy es ' + hoy);
    console.log('Nací el ' + naci);
}
fechas();

function desdeNac(desde) {
    let pasaronDias = moment().diff(moment(desde, "YYYYMMDD"), 'days');
    let pasaronAnos = moment().diff(moment(desde, "YYYYMMDD"), 'years');
    console.log('Desde mi nacimiento han pasado ' + pasaronAnos + ' años.');
    console.log('Desde mi nacimiento han pasado ' + pasaronDias + ' días.');
}
desdeNac("19961101");