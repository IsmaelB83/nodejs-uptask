const { User } = require('../models');

const ctrl = {};

ctrl.formNew = async (req, res, next) => {
    res.render('newuser', {
        nombrePagina: 'New User',
    });
}

ctrl.post = async (req, res, next) => {
    try {
        let user = {...req.body};  
        user = await User.create(user);  
        if (!user) {
            return next();
        }
        res.redirect('/login/');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('newuser', {
            nombrePagina: 'New User',
            messages: req.flash(),
            email: req.body.email,
            password: req.body.password
        });
    }
    
}

module.exports = ctrl;