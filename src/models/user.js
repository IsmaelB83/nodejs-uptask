const sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const db = require('../config/db');
const Project = require('./project');


const User = db.define('users', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    },
    active: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    token: sequelize.STRING,
    expire: sequelize.DATE
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

User.hasMany(Project, { as: 'projects', foreignKey: 'userId' } );

module.exports = User;