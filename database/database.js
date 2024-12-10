const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env.example' });

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_CONNECTION || 'mysql';

if (!dbName || !dbUser || !dbPassword || !dbHost || !dbDialect) {
  console.error('Error: Las variables de entorno necesarias no están definidas');
  console.error('Por favor, asegúrate de que tu archivo .env.example contenga las siguientes variables:');
  console.error('DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_CONNECTION');
  process.exit(1);
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error.message);
    process.exit(1);
  });

module.exports = sequelize;
