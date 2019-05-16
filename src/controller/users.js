const passport = require('passport');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const sequelize = require('sequelize');
const Op = sequelize.Op

const { User } = require('../models');

const ctrl = {};

ctrl.formNew = async (req, res, next) => {
    res.render('user/newuser', {
        nombrePagina: 'New User',
    });
}

ctrl.formReset = async (req, res, next) => {
    res.render('user/reset', {
        nombrePagina: 'Reset password',
    });
}

ctrl.formLogin = async (req, res, next) => {
    res.render('user/login', {
        nombrePagina: 'Login', 
    })
}

ctrl.create = async (req, res, next) => {
    try {
        let user = {...req.body};  
        user = await User.create(user);  
        if (!user) {
            return next();
        }
        res.redirect('/user/login/');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('user/newuser', {
            nombrePagina: 'New User',
            messages: req.flash(),
            email: req.body.email,
            password: req.body.password
        });
    }
}

ctrl.reset = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email }});
        if (!user) {
            req.flash('error', 'Usuario no encontrado');
            res.redirect('/user/reset');
        }
        user.token = crypto.randomBytes(20).toString('hex');
        user.expire = Date.now() + 360000;
        await user.save();
        res.redirect(`/user/reset/${user.token}`);
    } catch (error) {
        req.flash('error', `Error incontrolado ${error.toString}`);
        res.render('user/reset', {
            nombrePagina: 'Reset password',
            messages: req.flash(),
            email: req.body.email,
        });
    }
}

ctrl.resetWithToken = async (req, res, next) => {
    //res.json(req.params.token);
    const user = await User.findOne({where: {token: req.params.token}});
    if (!user) {
        req.flash('error', 'Token no encontrado');
        res.redirect('/user/reset');
    }
    res.render('user/resetPassword', {
        nombrePagina: 'Resetear password'
    })
    res.json(user);
}

ctrl.updatePassword = async (req, res, next) => {
    //res.json(req.params.token);
    const user = await User.findOne(
        {   where: 
            {   token: req.params.token,
                expire: {
                    [Op.gte]: Date.now()
                }
            }
        }
    );
    if (!user) {
        req.flash('error', 'Token no encontrado o expirado');
        res.redirect('/user/reset');
    }
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    user.token = null;
    user.expire = null;
    await user.save();
    req.flash('correcto', 'Tu password se ha restablecido con éxito');  
    res.redirect('/user/login');
}

ctrl.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login/',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

ctrl.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/user/login/');
    });
}

ctrl.userAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/user/login/');
}

module.exports = ctrl;