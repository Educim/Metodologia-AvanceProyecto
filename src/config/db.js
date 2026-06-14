const { DataSource } = require('typeorm');
require('dotenv').config();

const Familia = require('../entities/Familia');
const Voluntario = require('../entities/Voluntario');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'metodologia_db',
  synchronize: true,
  logging: false,
  entities: [Familia, Voluntario],
});

module.exports = AppDataSource;