const express = require('express');
const { body } = require('express-validator/check');
const { ProjectCtrl, TaskCtrl, UserCtrl } = require('../controller');

module.exports = () => {
    const router = express.Router();
    // Rutas de proyecto
    router.get('/', 
        UserCtrl.userAuthenticated,
        ProjectCtrl.index
    );
    router.get('/project/:url',
        UserCtrl.userAuthenticated, 
        ProjectCtrl.get
    );
    router.post('/project/', 
        UserCtrl.userAuthenticated,
        body('name').not().isEmpty().trim().escape(),
        ProjectCtrl.post
    );
    router.patch('/project/:id', 
        UserCtrl.userAuthenticated,
        body('name').not().isEmpty().trim().escape(),
        ProjectCtrl.patchName
    );
    router.delete('/project/:url', 
        UserCtrl.userAuthenticated,
        ProjectCtrl.delete
    );
    router.get('/project/new', 
        UserCtrl.userAuthenticated,
        ProjectCtrl.formNew);
    router.get('/project/edit/:id', 
        UserCtrl.userAuthenticated,
        ProjectCtrl.formEdit
    );
    // Rutas de tareas
    router.post('/project/task/:id',
        UserCtrl.userAuthenticated,
        body('name').not().isEmpty().trim().escape(),
        TaskCtrl.post
    );
    router.patch('/project/task/:id', 
        UserCtrl.userAuthenticated,
        TaskCtrl.patchStatus
    );
    router.delete('/project/task/:id', 
        UserCtrl.userAuthenticated,
        TaskCtrl.delete
    );
    // Rutas de cuentas de usuario
    router.get('/user/new', UserCtrl.formNew);
    router.get('/user/reset/', UserCtrl.formReset);
    router.get('/user/login/', UserCtrl.formLogin);
    router.post('/user/', UserCtrl.create);
    router.post('/user/reset/', UserCtrl.sendToken);
    router.get('/user/reset/:token', UserCtrl.resetWithToken);
    router.get('/user/new/:token', UserCtrl.activateUser);
    router.post('/user/reset/:token', UserCtrl.updatePassword);
    router.post('/user/login/', UserCtrl.login);
    router.get('/user/logout/', 
        UserCtrl.userAuthenticated,
        UserCtrl.logout
    )

    return router;
}