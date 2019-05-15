const { Project, Task } = require('../models');

const ctrl = {};

// Index (list project)
ctrl.index = async (req, res, next) => {
    const projects = await Project.findAll();
    res.render('index', {
        nombrePagina: 'Projects',
        projects
    });
};

// Get (view project by URL)
ctrl.get = async (req, res, next) => {
    // Find project in database
    const project = await Project.findOne({ 
        where: {
            url: req.params.url,
        } 
    });
    // No encontrado, error y continuo
    if (!project) {
        console.log(`Proyecto ${req.params.id} no encontrado`);
        return next();
    }
    // Busco las tareas
    const tasks = await Task.findAll({
        where: {
            projectId: project.id
        },  
        /* include: [ { model: Project } ] */
    })
    // Encontrado renderizo 
    const projects = await Project.findAll();
    res.render('project', {
        nombrePagina: 'Tareas del proyecto',
        projects,
        project,
        tasks
    });
};

// Post (insert a new project)
ctrl.post = async (req, res, next) => {
    // Validacion de datos propia
    let errores = [], projects, project;
    // Construyo el objeto project
    project = { ...req.body };
    // Chequeos
    if (!project.name) {
        errores.push( { texto: 'El nombre del proyecto es obligatorio' } );
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
        await Project.create(project);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/');
}

// update project name
ctrl.patchName = async (req, res, next) => {
    // Validacion de datos propia
    let errores = [];
    // Chequeos
    if (!req.body.name) {
        errores.push( { texto: 'El nombre del proyecto es obligatorio' } );
    }
    // Si hay errores
    if (errores.length > 0) {
        projects = await Project.findAll();
        res.render('newproject', {
            nombrePagina: 'Edit Project',
            errores,
            projects
        });
        return next();
    }
    // No hay errores
    try {
        console.log(req.body.name);
        console.log(req.params.id);
        let project = await Project.update(
            { name: req.body.name },
            { where: { id: req.params.id } }    
        );
        if (!project) {
            console.log('Error actualizando proyecto');
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect('/');
}

// Delete (project by URL)
ctrl.delete = async (req, res, next) => {
    // Encontrado renderizo 
    try {
        const project = await Project.findOne({where: {url: req.params.url}});
        if (project) {
            await Task.destroy({where: {projectId: project.id}});
            const result = await Project.destroy({where: {id: project.id}});
            if (!result) {
                return next();
            } 
        } else {
            return next();
        }
        res.status(200).send('OK');
    } catch (error) {
        res.status(500).send(error); 
    }
};

// Create form (use to create projects)
ctrl.formNew = async (req, res, next) => {
    const projects = await Project.findAll();
    res.render('newproject', {
        nombrePagina: 'New Project',
        projects
    });
    return next();
};

// Edit form (use to create projects)
ctrl.formEdit = async (req, res, next) => {
    const projects = await Project.findAll();
    const project = await Project.findOne({ 
        where: {
            id: req.params.id,
        } 
    });
    res.render('newproject', {
        nombrePagina: 'Edit Project',
        projects,
        project
    });
};

module.exports = ctrl;