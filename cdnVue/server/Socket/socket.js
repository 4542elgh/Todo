module.exports = (server, db) => {

    const io = require('socket.io')(server)

    io.on('connection', socket => {

        // on making a connection - load in the content already present on the database
        db.allProjects()
            .then(projects => socket.emit('refresh-projects', projects))
            
        //creating project
        socket.on('create-project', projectName => {
            db.createProject(projectName)
                .then(project => io.emit('project-created', project))
                .catch(err => io.emit('project-already-exists', err)) //if error, error message is emitted back
        })

        //NO io.emit needed front end should call refresh-project
        socket.on('delete-project',(projectName)=>{
            db.deleteProject(projectName)
            .then(result => {return})
            .catch(err => io.emit('error-deleting-project', err))
        })

        socket.on('edit-project-name', (oldName, newName)=>{
            db.editProjectName(oldName,newName)
            .then(updatedProject => io.emit('updated-project-name', updatedProject.name))
            .catch(err => io.emit('error-editing-project-name', err))
        })
        socket.on('add-todo', (projectName, todo) => {
            db.addTodo(projectName, todo)
                .then(project => io.emit('added-todo', project.todos))
                .catch(err => io.emit('todo-already-exists', err))
        })

        socket.on('toggle-todo', (projectName,todo, status) =>{
            db.toggleTodo(projectName,todo, status)
                .then(project => io.emit('todo-toggled-inProject',project.todos))
                .catch(err => io.emit('todo-toToggle-doesNotExists', err))
        })
        
        socket.on('delete-todo',(projectName, desc) =>{

            db.deleteTodo(projectName, desc)
            .then(project => io.emit('existing-todos', project.todos))
            .catch(err => io.emit('error-on-deletion-ofTodo', err))
        })

        socket.on('edit-todo',(projectName, oldDesc, newDesc) =>{
            db.editTodo(projectName,oldDesc,newDesc)
            .then(project => io.emit('updated-todo',project.todos))
            .catch(err => io.emit('error-updating-todo', err))
        })

        socket.on('remove-completed-todos',( projectName) =>{
            db.removeCompletedTodos(projectName)
            .then(project => {
                io.emit('completed-todos', project.todos)
            })
            .catch(err => io.emit('no-completed-todos',err))
        })

    })
}