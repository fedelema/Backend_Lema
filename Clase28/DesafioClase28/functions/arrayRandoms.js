function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandoms(e) {
    let array = [];
    for(i=0; i<e; i++) {
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
    const obj = getRandoms(parseInt(msg));
    process.send(obj);
})