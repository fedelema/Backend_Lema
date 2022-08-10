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
    const title = document.getElementById('title').value;
    const price = parseInt(document.getElementById('price').value);
    const thumbnail = document.getElementById('thumbnail').value;

    socket.emit('NUEVO_PRODUCTO', {title, price, thumbnail});
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

function appendMessage(msg) {
    document.getElementById('posts').innerHTML += `
        <div class="post ui card">
            <div class="content">
                <b>${msg.email} [${msg.fecha}]:</b> ${msg.mensaje}
            </div>
        </div>
    `;
}

function enviarMensaje() {
    const email = document.getElementById('email').value;
    const fecha = new Date().toLocaleString();
    const mensaje = document.getElementById('mensaje').value;

    socket.emit('POST_MESSAGE', {email, fecha, mensaje});
}

function likeMessage(msgId) {
    socket.emit('LIKE_MESSAGE', msgId);
}