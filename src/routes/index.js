const express = require('express');
const { body } = require('express-validator/check');
const { ProjectCtrl, TaskCtrl, UserCtrl, AuthCtrl } = require('../controller');

module.exports = () => {
    const router = express.Router();
    // Rutas de proyecto
    router.get('/', 
        AuthCtrl.userAuthenticated,
        ProjectCtrl.index
    );
    router.get('/project/:url',
        AuthCtrl.userAuthenticated, 
        ProjectCtrl.get
    );
    router.post('/project/', 
        AuthCtrl.userAuthenticated,
        body('name').not().isEmpty().trim().escape(),
        ProjectCtrl.post
    );
    router.patch('/project/:id', 
        AuthCtrl.userAuthenticated,
        body('name').not().isEmpty().trim().escape(),
        ProjectCtrl.patchName
    );
    router.delete('/project/:url', 
        AuthCtrl.userAuthenticated,
        ProjectCtrl.delete
    );
    router.get('/project/new', 
        AuthCtrl.userAuthenticated,
        ProjectCtrl.formNew);
    router.get('/project/edit/:id', 
        AuthCtrl.userAuthenticated,
        ProjectCtrl.formEdit
    );
    // Rutas de tareas
    router.post('/project/task/:id',
        AuthCtrl.userAuthenticated,
        body('name').not().isEmpty().trim().escape(),
        TaskCtrl.post
    );
    router.patch('/project/task/:id', 
        AuthCtrl.userAuthenticated,
        TaskCtrl.patchStatus
    );
    router.delete('/project/task/:id', 
        AuthCtrl.userAuthenticated,
        TaskCtrl.delete
    );
    // Rutas de cuentas de usuario
    router.get('/user/new', UserCtrl.formNew);
    router.post('/user/', UserCtrl.post);
    // Rutas de autenticacion
    router.get('/login/', AuthCtrl.formLogin);
    router.post('/login/', AuthCtrl.login)
    router.get('/logout/', 
        AuthCtrl.userAuthenticated,
        AuthCtrl.logout
    )


    return router;
}