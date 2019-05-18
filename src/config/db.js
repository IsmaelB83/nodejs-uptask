const Sequelize = require('sequelize');

const sequelize = new Sequelize('uptaskdb', 'trama', 'qwerty83', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;