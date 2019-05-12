const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require ('slug');
const shortid = require('shortid');


const Proyectos = db.define('proyectos', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: sequelize.STRING,
    url: sequelize.STRING 
}, {
    hooks: {
        beforeCreate(proyecto) {
            proyecto.url = `${slug(proyecto.nombre).toLowerCase()}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;