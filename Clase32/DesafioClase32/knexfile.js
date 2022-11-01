const dotenv = require('dotenv');
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST || "127.0.0.1";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
const DATABASE_NAME = process.env.DATABASE_NAME || "desafio16";

const knexConfig = {
    client: 'mysql',
    connection: {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds: {
        tableName: 'knex_seeds',
        directory: './seeds',
    }
}

module.exports = knexConfig;

// Crear una nueva migración:
// knex migrate:make <nombre_migracion>

// Crear una nueva seed (Data inicial):
// knex seed:make <nombre_seed>