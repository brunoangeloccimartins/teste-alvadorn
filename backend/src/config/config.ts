import { Dialect } from 'sequelize';

interface DBConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  dialect: Dialect;
}

interface Config {
  [key: string]: DBConfig;
}

const config: Config = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    host: process.env.DB_HOST,
    dialect: 'postgres' as Dialect,
  },
  // Outras configurações (test, production, etc.)...
};

export default config;
