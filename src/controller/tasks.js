const { Project, Task } = require('../models');

const ctrl = {};

// Post (insert a new task)
ctrl.post = async (req, res, next) => {
    // Validacion de datos propia
    let errores = [], projects, project;
    // Chequeos
    if (!req.body.name) {
        errores.push( { texto: 'El nombre de la tarea es obligatorio' } );
    }
    project = Project.findOne({where: {url: req.param.id }});
    if (!project) {
        errores.push( { texto: 'El proyecto no se ha encontrado' } );
    }
    // Si hay errores
    if (errores.length > 0) {
        projects = await Project.findAll();
        res.render('newproject', {
            nombrePagina: 'New Project',
            errores,
            projects
        });
        return next();
    }
    // No hay errores
    try {
        task = {
            name: req.body.name,
            status: false,
            projectId: project.id
        }
        await Task.create(task);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/');
}

module.exports = ctrl;