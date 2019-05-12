const express = require('express');
const { body } = require('express-validator/check');
const { ProjectCtrl, TaskCtrl } = require('../controller');

module.exports = () => {
    const router = express.Router();
    // Rutas de proyecto
    router.get('/', ProjectCtrl.index);
    router.get('/project/:url', ProjectCtrl.get);
    router.post('/project/', 
        body('name').not().isEmpty().trim().escape(),
        ProjectCtrl.post
    );
    router.post('/project/:id', 
        body('name').not().isEmpty().trim().escape(),
        ProjectCtrl.put
    );
    router.delete('/project/:url', ProjectCtrl.delete);
    router.get('/project/new', ProjectCtrl.formNew);
    router.get('/project/edit/:id', ProjectCtrl.formEdit)
    // Rutas de tareas
    router.post('/project/task/:id',
        body('name').not().isEmpty().trim().escape(),
        TaskCtrl.post
    );
    return router;
}