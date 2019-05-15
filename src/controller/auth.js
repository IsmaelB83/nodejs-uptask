const passport = require('passport');

ctrl = {};

ctrl.formLogin = async (req, res, next) => {
    res.render('login', {
        nombrePagina: 'Login', 
    })
}

ctrl.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

ctrl.userAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login/');
}

ctrl.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login/');
    });
}

module.exports = ctrl;
