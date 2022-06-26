// Lectura y escritura de archivos
const fs = require('fs');

fs.readFile('./package.json', 'utf-8', (error, contenido) => {
    if(error) {
        console.log(error);
    } else {
        console.log(contenido);
        const info = {
            contenidoStr: contenido,
            contenidoObj: JSON.parse(contenido),
            size: fs.statSync('./package.json').size + ' bytes'
        }
        console.log(info);

        const info2 = JSON.stringify(info, null, 2);
        fs.appendFile('./info.txt', info2, error => {
            if(error) {
                console.log(error)
            } else {
                console.log('Guardado')
            }
        })
    }
});