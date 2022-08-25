const { options } = require('./options/SQLite3');
const knex = require('knex')(options);

const articulos = [
    {nombre: 'lapiz', codigo: 'L1', precio: 10.5, stock: 40},
    {nombre: 'goma', codigo: 'G1', precio: 8, stock: 25},
    {nombre: 'sacapunta', codigo: 'S1', precio: 7.5, stock: 10},
    {nombre: 'lapicera', codigo: 'L2', precio: 15, stock: 100},
    {nombre: 'regla', codigo: 'R1', precio: 12.2, stock: 20}
];

knex('articulos').insert(articulos)
    .then(() => console.log('Data ingresada'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });