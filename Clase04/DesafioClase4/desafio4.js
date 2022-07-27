const fs = require ('fs');

class Contenedor {
    constructor (title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id
    }
}

    // --> Declaro unos productos iniciales
/* let prods = [];
const util1 = new Contenedor('Regla', 121.44, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 1);
const util2 = new Contenedor('Calculadora', 222.33, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png', 2);
const util3 = new Contenedor('Globo', 350.22, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', 3);
prods.push(util1, util2, util3);
let prodsIniciales = JSON.stringify(prods);
fs.appendFile('./productos.txt', prodsIniciales, error => {
    if (error) {console.log(error)}
    else {console.log('Guardado correctamente')}
}); */


    // --> FUNCIONES DEL EJERCICIO
function save(object) {
    let data = fs.readFileSync('./productos.txt','utf-8');
    let prodsObjeto = JSON.parse(data);

    object.id = prodsObjeto.length + 1;
    prodsObjeto.push(object);
    console.log(prodsObjeto);

    let prodsTexto = JSON.stringify(prodsObjeto);
    fs.writeFile('./productos.txt', prodsTexto, error => {
        if (error) {console.log(error)}
        else {console.log('Guardado correctamente')}
    });
}
//const util4 = new Contenedor('Nuevo Producto', 120.99, 'http');
//save(util4);

function getById(id) {
    let data = fs.readFileSync('./productos.txt','utf-8');
    let prodsObjeto = JSON.parse(data);

    for(i=0; i<prodsObjeto.length; i++) {
        if(prodsObjeto[i].id == id) {
            console.log(prodsObjeto[i]);
        }
    }
}
//getById(4);

function getAll() {
    let data = fs.readFileSync('./productos.txt','utf-8');
    let prodsObjeto = JSON.parse(data);
    console.log(prodsObjeto);
}
//getAll();

function deleteById(id){
    let data = fs.readFileSync('./productos.txt','utf-8');
    let prodsObjeto = JSON.parse(data);

    let filtrado = prodsObjeto.filter(i => i.id !== id);
    console.log(filtrado);
    let prodsTexto = JSON.stringify(filtrado);
    fs.writeFile('./productos.txt', prodsTexto, error => {
        if (error) {console.log(error)}
        else {console.log('Filtrado correctamente')}
    });
}
//deleteById(4);

function deleteAll(){
    fs.unlink('./productos.txt', error => {
        if (error) {console.log(error)}
        else {console.log('Archivo eliminado')}
    });
}
//deleteAll();