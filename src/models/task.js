const sequelize = require('sequelize');
const db = require('../config/db');
const Project = require('./project');

const Task = db.define('tasks', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(100),
    status: sequelize.BOOLEAN,
});
Task.belongsTo(Project);

module.exports = Task;

