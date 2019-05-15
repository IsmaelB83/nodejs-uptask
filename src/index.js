const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { db, passport } = require('./config');
const helpers = require('./helpers');

// Connect to the db
const { Project, Task, User } = require('./models');
db.sync()
//db.authenticate()
    .then(() => console.log('Conectado al servidor'))
    .catch((error) => console.log(error));

// Create server app
const app = express();

// Static files
app.use(express.static('public'));

// Habilitar body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine and view folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Use connet-flash for messages
app.use(flash());

// Allow navigation while maintaining login
app.use(cookieParser());
app.use(session({
    secret: 'secret-key',
    reserve: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Asignar variables locales al response
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    res.locals.passport = req.session.passport;
    next();
});

// Use router
app.use('/', routes());

// Start server
app.listen(3000);