
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../server/database');
const Genero = require('./genero');


const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio_publicacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_genero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'libros',
  timestamps: false,
});


Libro.belongsTo(Genero, { foreignKey: 'id_genero' });

module.exports = Libro;
