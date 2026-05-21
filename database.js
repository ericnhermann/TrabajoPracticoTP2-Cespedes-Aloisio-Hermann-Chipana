const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_db', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql' // Opciones: 'postgres', 'sqlite', 'mariadb', 'mssql'
});

module.exports = sequelize;
