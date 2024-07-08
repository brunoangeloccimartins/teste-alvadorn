import { Sequelize } from 'sequelize';
import config from '../config/config';


const sequelize = new Sequelize(
  config.development.database || 'postgres',
  config.development.username || 'postgres',
  config.development.password || 'postgres',
  {
    host: config.development.host || 'db',
    dialect: config.development.dialect || 'postgres',
  },
);

export default sequelize;
