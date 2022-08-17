traerProductos(productos).then(html => {
    document.getElementById('prod-cargados').innerHTML = 'HOLA' + html
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