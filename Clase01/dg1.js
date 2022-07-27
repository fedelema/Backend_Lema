// Datos y variables
let nombre = 'pepe';
let edad = 25;
let precio = 99.90;
let seriesFav = ['Dark', 'Mr.Robot', 'Castlevania'];
let pelisFav = [{nombre:'El Padrino', año:1972, protagonista:'Marlon Brando'}, {nombre:'El Padrino 2', año:1974, protagonista:'Al Pacino'}];

console.log(nombre);
console.log(edad);
console.log(`$ ${precio}`);
console.log(seriesFav);
console.log(pelisFav);

edad += 1;
console.log(edad);

let nuevaSerie = 'Suits';
seriesFav.push(nuevaSerie);
console.log(seriesFav);