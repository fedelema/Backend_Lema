/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('productos').del()
  await knex('productos').insert([
    {nombre: 'FERNET', precio: 1000, foto: 'https://cdn4.iconfinder.com/data/icons/cocktails-11/504/cuba-libre-rum-cocktail-alcoholic-128.png'},
    {nombre: 'GIN', precio: 1400, foto: 'https://cdn0.iconfinder.com/data/icons/beverage-43/128/gin-tonic-cocktail-cold-beverage-128.png'},
    {nombre: 'CERVEZA', precio: 250, foto: 'https://cdn1.iconfinder.com/data/icons/drink-beverage/512/26-beer-bottle-glass-drink-128.png'},
    {nombre: 'VODKA', precio: 850, foto: 'https://cdn0.iconfinder.com/data/icons/beverage-43/128/tequila-liquor-margarita-vodka-bar-128.png'}
  ]);
};