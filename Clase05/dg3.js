// Calculadora de edad
const moment = require("moment");

function fechas() {
    let hoy = moment().format('DD/MM/YYYY');
    let naci = moment("19961101", "YYYYMMDD").format('DD/MM/YYYY');
    console.log('Hoy es ' + hoy);
    console.log('Nací el ' + naci);
}
fechas();

function desdeNac(desde) {
    let pasaronDias = moment().diff(moment(desde, "YYYYMMDD"), 'days');
    let pasaronAnos = moment().diff(moment(desde, "YYYYMMDD"), 'years');
    console.log('Desde mi nacimiento han pasado ' + pasaronAnos + ' años.');
    console.log('Desde mi nacimiento han pasado ' + pasaronDias + ' días.');
}
desdeNac("19961101");