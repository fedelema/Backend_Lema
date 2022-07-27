// Lectura y escritura con promises
const fs = require('fs');

// Leer con sintaxis then/catch + ejercicio
function leerTC() {
    fs.promises.readFile('./info.txt', 'utf-8')
    .then(contenido => {
        console.log(contenido);
        const info = JSON.parse(contenido);
        console.log(info);
        info.contenidoObj.author = 'Coderhouse';
        console.log(info);
        const infoString = JSON.stringify(info.contenidoObj, null, 2);

        function agregar() {
            fs.promises.appendFile('./package.json.coder', infoString)
            .then(console.log('Agregado'))
            .catch(err => {
                console.log('Error de lectura', err)
            })
        }
        agregar();
    })
    .catch(err => {
        console.log('Error de lectura', err)
    })
}
leerTC();

// Leer con sintaxis async/await
async function leerAA() {
    try {
        const contenido = await fs.promises.readFile('./info.txt', 'utf-8');
        console.log(contenido);
        const info = JSON.parse(contenido);
        console.log(info);
    }
    catch(err) {
        console.log('Error de lectura', err)
    }
}
//leerAA();