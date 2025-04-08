const controller = require('./alunosController');

module.exports = (app) => {
    app.get('/alunos', controller.get);
    app.get('/alunos/:id', controller.getById);
    app.post('/alunos', controller.post);
    app.put('/alunos/:id', controller.put);
    app.delete('/alunos/:id', controller.delete); 
};
