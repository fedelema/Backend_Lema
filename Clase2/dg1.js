// Funciones y closures
let lista = ['dato1', 'dato2', 'dato3'];
let lista2 = [];

function mostrarLista(e) {
    if(e.length == 0) {
        console.log('lista vacía')
    }
    else {
        console.log(e);
    }
}
mostrarLista(lista);
mostrarLista(lista2);

let numero = 9;
function crearMultiplicador(n1) {
    return function(n2) {
        let producto = n1*n2;
        console.log(`Producto: ${producto}`);
    }
}
let multiplicador = crearMultiplicador(numero);
console.log(multiplicador(4));

function duplicar(e) {
    let numDuplicado = e*2;
    console.log(`El número ${e} duplicado es igual a ${numDuplicado}`);
}
duplicar(5);
duplicar(42);
duplicar(9);

function triplicar(e) {
    let numTriplicado = e*3;
    console.log(`El número ${e} triplicado es igual a ${numTriplicado}`);
}
triplicar(3);
triplicar(10);
triplicar(50);