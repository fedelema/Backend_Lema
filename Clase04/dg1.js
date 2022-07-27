// Asincronismo y callbacks
const fin = () => console.log('terminé');

function mostrarLetras(e, tiempo) {
    setTimeout(() => {
        let texto = e.split('');
        let i = 0;
        let intervalo = setInterval((a) => {
            if(i < texto.length) {
                console.log(texto[i]);
                i += 1;
            }
            else if(i == texto.length) {
                fin();
                i += 1;
            }
            else {clearInterval(intervalo)}
        }, 1000);
    }, tiempo);
}

mostrarLetras('hola', 0);
mostrarLetras('hola', 250);
mostrarLetras('hola', 500);