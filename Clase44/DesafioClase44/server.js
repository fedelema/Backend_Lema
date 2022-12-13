const express = require('express');
const app = express();
const routerProductos = require('./routes/productos');
const routerCarritos = require('./routes/carritos');
const PORT = process.env.PORT || 3000;
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ContenedorArchivo = require('./src/contenedores/contenedorArchivo');
const { productosDao }  = require('./src/daos/index');
const productos = productosDao;

const schema = buildSchema(`
    type Producto {
        id: ID!
        nombre: String
        descripcion: String
        precio: Int
        foto: String
        stock: Int
    }

    input ProdInput {
        nombre: String
        descripcion: String
        precio: Int
        foto: String
        stock: Int
    }

    type Query {
        getProducto(id: ID!): Producto
        getProductos(campo: String, valor: String): [Producto]
    }

    type Mutation {
        createProducto(datos: ProdInput): Producto
        updateProducto(id: ID!, datos: ProdInput): Producto
        deleteProducto(id: ID!): Producto
    }
`);

class Producto {
    constructor (id, {nombre, descripcion, precio, foto, stock}){
        this.id = parseInt(id);
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.foto = foto;
        this.stock = stock;
    }
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

function getProducto({id}) {
    const prod = productos.getById(id);
    return prod;
}

function getProductos({campo, valor}) {
    const prods = productos.getAll();
    if (campo && valor) {
        return prods.filter(p => p[campo] === valor);
    } else return prods;
}

function createProducto({datos}) {
    const id = productos.save(datos);
    const prodNuevo = new Producto(id, datos);

    return prodNuevo;
}

function updateProducto({id, datos}) {
    const prodNuevo = new Producto(id, datos);
    productos.updateById(id, prodNuevo);
    return prodNuevo;
}

function deleteProducto({id}) {
    const prodBorrado = productos.getById(id);
    productos.deleteById(id);
    return prodBorrado;
}

app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        getProducto,
        getProductos,
        createProducto,
        updateProducto,
        deleteProducto
    },
    graphiql: true
}));

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));