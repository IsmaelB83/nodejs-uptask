const { Project, Task } = require('../models');

const ctrl = {};

// Post (insert a new task)
ctrl.post = async (req, res, next) => {
    // Variables locales
    let errores, task, project;
    // Tarea a crear
    task = {
        name: req.body.name,
        status: false,
        projectId: req.params.id
    }
    // Busco el proyecto sobre el que se trata de crear una tarea
    project = await Project.findOne( { where: { id: req.params.id } } );
    if (!project) {
        res.status(404).send('Proyecto no encontrado');
        return next();
    }
    // Validaciones de datos
    if (!task.name) {
        errores.push( { texto: 'El nombre de la tarea es obligatorio' } );
        projects = await Project.findAll();
        res.render('newproject', {
            nombrePagina: 'New Project',
            errores,
            projects
        });
        return next();
    }
    // No hay errores
    task = await Task.create(task);
    if (!task) {
        res.status(500).send('Error creando la tarea');
        return next();
    } 
    res.redirect(`/project/${project.url}`);
}

// Update task status information
ctrl.patchStatus = async (req, res, next) => {
    try {
        let task = await Task.findOne({where: {id: req.params.id}})
        if (task) {
            task = await Task.update(
                { status: task.status===true?false:true },
                { where: { id: req.params.id } }    
            );
            res.status(200).send('OK');
            return;
        }
        res.status(500).send('ERROR');
    } catch (error) {
        res.status(500).send('ERROR');
    }
}

// Delete (task by id)
ctrl.delete = async (req, res, next) => {
    // Encontrado renderizo 
    try {
        const result = await Task.destroy({where: {id: req.params.id}});
        if (!result) {
            return next();
        }
        res.status(200).send('OK');
    } catch (error) {
        res.status(500).send(error); 
    }
};


module.exports = ctrl;