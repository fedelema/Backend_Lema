function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandoms(e) {
    const cant = e || 100000000;
    let array = [];
    for(i=0; i<cant; i++) {
        let numero = random(1, 1000);
        array.push(numero);
    }

    let repetidos = {};
    array.forEach(function(numero) {
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    repetidosString = JSON.stringify(repetidos);
    return repetidosString
}

process.on('message', (msg) => {
    console.log(msg);
    const obj = getRandoms();
    process.send(obj);
})