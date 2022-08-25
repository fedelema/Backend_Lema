const { options } = require('./options/SQLite3');
const knex = require('knex')(options);

knex('articulos').select('*')
    .then((rows) => {
        for(row of rows) {
            console.log(`${row['id']} ${row['nombre']} ${row['codigo']} ${row['precio']} ${row['stock']}`);
        }
    })
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });

knex('articulos').where({id: 3}).del()
    .then(() => console.log('Articulo borrado'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });

knex('articulos').where({id: 2}).update({stock: 0})
    .then(() => console.log('Articulo actualizado'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });