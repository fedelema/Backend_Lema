class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
    }

    addMascota(e) {
        this.mascotas.push(e);
        console.log(`Mascotas: ${this.mascotas}`);
    }

    countMascotas() {
        console.log(`Cantidad de mascotas: ${this.mascotas.length}`);
    }

    addBook(nombre, autor) {
        this.libros.push({nombre, autor});
        console.log(this.libros);
    }

    getBookNames() {
        let nombresLibros = this.libros.map(item => item.nombre);
        /* let nombresLibros = [];
        for (let i=0; i<this.libros.length; i++) {
            nombresLibros.push(this.libros[i].nombre);
        } */
        console.log(`Nombres de libros: ${nombresLibros}`);
    }
}

const usuario = new Usuario (
    "Leo", 
    "Messi", 
    [{nombre:"Futbol1", autor:"Maradona"}, {nombre:"Futbol2", autor:"Riquelme"}, {nombre:"Futbol3", autor:"Ronaldinho"}], 
    ["CR7", "Ney", "Mbappe"]
    );

console.log(usuario);
usuario.getFullName();
usuario.addMascota("Xavi");
usuario.countMascotas();
usuario.addBook("Futbol4", "Pele");
usuario.getBookNames();
