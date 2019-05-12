const express = require('express');
const { body } = require('express-validator/check');
const controller = require('../controller');

module.exports = () => {
    const router = express.Router();
    router.get('/', controller.index);
    router.get('/project/:url', controller.get);
    router.post('/project/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        controller.put
    );
    router.post('/project/', 
        body('nombre').not().isEmpty().trim().escape(),
        controller.post
    );
    router.get('/project/new', controller.formNew);
    router.get('/project/edit/:id', controller.formEdit)
    return router;
}