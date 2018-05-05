module.exports = (server, db) => {
    const io = require('socket.io')(server)

    io.on('connection', socket => {

        //update projects
        db.allProjects()
            .then(projects => socket.emit('refresh-projects', projects))
        
            //creating project
        socket.on('create-project', projectName => {
            db.createProject(projectName)
                .then(project => io.emit('project-created', project))
                .catch(err => io.emit('project-already-exists', err)) //if error, error message is emitted back
        })

        socket.on('add-todo', (projectName, todo) => {
            db.addTodo(projectName, todo)
                .then(todo => io.emit('added-todo', todo))
                .catch(err => io.emit('todo-already-exists', err))
        })

        socket.on('toggle-todo', (projectName,todo, status) =>{
            //TODO: Not sure if I should be inverting the status for toggle or db
            db.toggleTodo(projectName,todo, status)
            .then(projectName=>{
                db.findProject(projectName)//TODO:Not sure if I shoul be emmiting a new fresh project in which the todo was toggled
                .then(project => io.emit('todo-toggled-inProject',project))
            })
            .catch(err => io.emit('todo-toToggle-doesNotExists', err))
        })

        socket.on('remove-completed-todos',( projectName) =>{
            db.removeCompletedTodos(projectName)
            .then(project => io.emit('completed-todos', project)) //TODO: Not sure if I should emit the whole project or just todos
            .catch(err => io.emit('no-completed-todos',err))
        })

    })
}