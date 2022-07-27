// Array de objetos
const productos = [
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

console.log(arrayFinal);
