// Cliente WebSocket
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
    const url = 'http://localhost:3000/main.hbs';
    return fetch(url)
        .then(res => res.text())
        .then(text => {
            const template = Handlebars.compile(text);
            const html = template({ productos })
            return html
        })
}

function cargarProducto() {
    const nombre = document.getElementById('nombre-prod').value;
    const precio = parseInt(document.getElementById('precio').value);
    const foto = document.getElementById('foto').value;

    socket.emit('NUEVO_PRODUCTO', {nombre, precio, foto});
}

socket.on('UPDATE_MESSAGES', (msg, allMessages) => {
    document.getElementById('posts').innerHTML = '';
    allMessages
        .sort((a,b) => a.date - b.date)
        .forEach(msg => appendMessage(msg));
});

socket.on('NEW_MESSAGE', (msg) => {
    appendMessage(msg);
})

socket.on('COMPRESION', compresion => {
    document.getElementById('compresion').innerHTML = `
        Porcentaje de compresión: ${compresion}%
    `;
})

function appendMessage(msg) {
    document.getElementById('posts').innerHTML += `
        <div class="post ui card">
            <div class="content">
                <img src="${msg.author.avatar}" style="width:20px"/>
                <b>${msg.author.alias}</b>
                <b>(${msg.author.id}) [${msg.author.fecha}]:</b> 
                <p>${msg.text}</p>
            </div>
        </div>
    `;
}

function enviarMensaje() {
    const author = {
        id: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
        fecha: new Date().toLocaleString()
    };
    const text = document.getElementById('text').value;

    socket.emit('POST_MESSAGE', {author, text});
}