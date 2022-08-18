const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('PRODUCTOS_CARGADOS', productos => {
    traerProductos(productos).then(html => {
        document.getElementById('prod-cargados').innerHTML = html
    })
});

function traerProductos(productos) { 
    const url = 'http://localhost:8080/main.hbs';
    return fetch(url)
        .then(res => res.text())
        .then(text => {
            const template = Handlebars.compile(text);
            const html = template({ productos })
            return html
        })
}

function cargarProducto() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseInt(document.getElementById('precio').value);
    const foto = document.getElementById('foto').value;
    const stock = parseInt(document.getElementById('stock').value);

    socket.emit('NUEVO_PRODUCTO', {nombre, descripcion, precio, foto, stock});
}

function agregarAlCarrito(e) {
    let id_producto = e;

    socket.emit('AGREGAR-PRODUCTO', id_producto);
}