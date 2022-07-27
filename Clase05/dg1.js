// Numeros aleatorios
function obtenerAleatorios() {
    
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
obtenerAleatorios();