'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      //table.increments()
      table.timestamps()
      table.integer('id').notNullable().unique()
      table.string('nombre', 50).notNullable()
      table.string('descripcion', 255).notNullable()
      table.integer('precio').notNullable()
      table.integer('stock').notNullable()
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductoSchema
