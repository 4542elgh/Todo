const 
    Mongoose = require('mongoose'),
    config = require('./config.json')

//local testing
Mongoose.connect('mongodb://localhost/todo')

//prod <-- use this for the presentation
Mongoose.connect(config.uri)

Mongoose.connection.on('error', err => {
    console.log('MongoDB Connection Error:' + err)
})

//create the project schema
const ProjSchema = new Mongoose.Schema({
    name: String,
    todos: [{
        name: String,
        completed: Boolean
    }]
}, { strict: false })

const Projects = Mongoose.model('projects', ProjSchema)

// find all projects
const allProjects = () => {
    return Projects.find()
} 

// finds a project that matches the project name
const findProject = (projectName) => {
    return Projects.findOne({ name: projectName })
}

// finds all todos for a project name
const allProjectTodos = (projectName) => {
    return findProject(projectName)
        .then((projectFound) => {
            if(!projectFound)
                throw new Error(`Unable to find ${projectName} in database`)
            
            return projectFound.todos
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

// create a project given the project name
const createProject = (projectName) => {
    // find if username is in db
    return findProject(projectName)
        .then(projectFound => {
            if (projectFound)
                throw new Error('Project already exists')

            //return the project object we will insert into the database
            return {
                name: projectName,
                todos: []
            }
        })
        .then(project => {
            //create the project
            Projects.create(project)
        })
        .then((name, todos) => {
            return { name, todos }
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

// add a todo to a specific project
const addTodo = (projectName, todoName) => {
    return allProjectTodos(projectName)
        .then(todos => {

            // search to see if a todo already exists
            todos.forEach(todo => {
                if(todo.name === todoName)
                    throw new Error('Todo already exists')
            })

            // push a new todo object to the list of todos
           return Projects.findOneAndUpdate({ name: projectName },  
                {
                    $push: { 
                        todos: {
                            name: todoName,
                            completed: false
                        } 
                    }
                }
            )
            .then(({ name, todos}) => {
                return { name, todos }
            })
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

//toggle a todo's status for a specific project
const toggleTodo = (projectName, todoName, status) => {
    return allProjectTodos(projectName)
        .then(todos => {

            // search for a matching todo's id
            searchId = ''
            todos.forEach(todo => {
                if(todo.name === todoName)
                    searchId = todo['_id']
            })

            if(searchId === '')
                throw new Error('Todo does not exist')

            // update the completed status of todo matching the searchId
           return Projects.findOneAndUpdate({ name: projectName, 'todos._id': searchId },  
                {
                    $set: { 
                        'todos.$.completed': status
                    }
                }
            )
            .then(({ name, todos}) => {
                return { name, todos }
            })
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

// remove all todos with completed set to 'true'
const removeCompletedTodos = (projectName) => {
    return allProjectTodos(projectName)
        .then(todos => {

            // create a list of all todos that are not completed
            cleanTodos = []
            todos.forEach(todo => {
                if(todo.completed !== true)
                    cleanTodos.push(todo)
            })

            if(cleanTodos.length === 0)
                throw new Error('No completed todos')

            // update the project's todos with the pruned todo list
            Projects.findOneAndUpdate({ name: projectName },  
                {
                    $set: { 
                        todos: cleanTodos
                    }
                }
            )
            .then(({ name, todos}) => {
                return { name, todos }
            })

            return true
        })
        .catch(err => {
            console.log(err)
            return null
        })
}

module.exports = {
    addTodo,
    allProjects,
    allProjectTodos,
    createProject,
    findProject,
    removeCompletedTodos,
    toggleTodo
}