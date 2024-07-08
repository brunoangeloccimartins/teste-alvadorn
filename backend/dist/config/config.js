"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
    // Outras configurações (test, production, etc.)...
};
exports.default = config;
