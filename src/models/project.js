const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require ('slug');
const shortid = require('shortid');


const Project = db.define('projects', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING,
    url: sequelize.STRING
}, {
    hooks: {
        beforeCreate(project) {
            project.url = `${slug(project.name).toLowerCase()}-${shortid.generate()}`;
        }
    }
});

module.exports = Project;