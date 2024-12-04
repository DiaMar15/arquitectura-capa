const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;
