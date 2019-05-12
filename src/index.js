const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./config/db');
const helpers = require('./helpers');

// Connect to the db
const model = require('./models/Proyectos');
//db.sync()
db.authenticate()
    .then(() => console.log('Conectado al servidor'))
    .catch((error) => console.log(error));

// Create server app
const app = express();

// Static files
app.use(express.static('public'));

// Set view engine and view folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Ejecutar el helpers para tener un vardump de los parametros recibidos en el request)
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

// Habilitar body parser
app.use(bodyParser.urlencoded({extended: true}));

// Use router
app.use('/', routes());

// Start server
app.listen(3000);