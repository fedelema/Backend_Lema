const { options } = require('./options/SQLite3');
const knex = require('knex')(options);

knex.schema.createTable('articulos', table => {
    table.increments('id').primary().notNullable()
    table.string('nombre', 15).notNullable()
    table.string('codigo', 10).notNullable()
    table.float('precio')
    table.integer('stock')
})
    .then(() => console.log('Tabla creada'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });