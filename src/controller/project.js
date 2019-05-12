const { Project } = require('../models');

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
    // Encontrado renderizo 
    const projects = await Project.findAll();
    res.render('project', {
        nombrePagina: 'Tareas del proyecto',
        projects,
        project
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

// Put (update project information)
ctrl.put = async (req, res, next) => {
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
        await Project.update(
            { nombre: req.body.nombre },
            { where: { id: req.params.id } }    
        );
    } catch (error) {
        console.log(error);
    }
    res.redirect('/');
}

// Delete (project by URL)
ctrl.delete = async (req, res, next) => {
    // Encontrado renderizo 
    try {
        const result = await Project.destroy({where: {url: req.params.url}});
        if (!result) {
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