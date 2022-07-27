//Clases
let contGlobal = 0;

class Contador {
    constructor(nombre) {
        this.nombre = nombre;
        this.cuentaI = 0;
        this.cuentaG = 0;
    }

    obtenerResponsable() {
        console.log('Nombre del responsable: ' + this.nombre);
    }

    obtenerCuentaIndividual(e) {
        this.cuentaI += e;
        contGlobal += this.cuentaI;
        console.log('Cuenta individual: ' + this.cuentaI)
    }

    obtenerCuentaGlobal() {
        this.cuentaG += contGlobal;
        console.log('Cuenta global: ' + this.cuentaG)
    }

    contar() {
        this.cuentaI += 1;
        this.cuentaG += 1;
        console.log('Cuenta individual incrementada en uno: ' + this.cuentaI);
        console.log('Cuenta global incrementada en uno: ' + this.cuentaG);
    }
}

let c1 = new Contador('juan');
c1.obtenerResponsable();
c1.obtenerCuentaIndividual(2);
c1.obtenerCuentaGlobal();
c1.contar();

let c2 = new Contador('pedro');
c2.obtenerResponsable();
c2.obtenerCuentaIndividual(3);
c2.obtenerCuentaGlobal();
c2.contar();

let c3 = new Contador('pablo');
c3.obtenerResponsable();
c3.obtenerCuentaIndividual(9);
c3.obtenerCuentaGlobal();
c3.contar();