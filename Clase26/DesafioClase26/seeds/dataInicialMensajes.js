/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mensajes').del()
  await knex('mensajes').insert([
    {email: 'fede1@gmail.com', mensaje: 'Hola!'},
    {email: 'fede2@gmail.com', mensaje: 'Hola a todos!'},
    {email: 'fede3@gmail.com', mensaje: 'Buen día!'},
  ]);
};
