import { projectComponent} from './components.js'

let socket = io()
Vue.component('modal', {
    template: '#modal-template'
})
const app = new Vue({
    el: '#app',
    data: {
        project: {
            projectName: '',
            uniqueId: 0
        },
        count: 0,
        projects: [],
        todoJSON: {},
        todoPreview: {},
        todoInputField: "",
        todoModalField:"",
        todoWarning: false,
        show: false,
        showModal: false,
    },
    methods: {
        createProject: function () {
            let project = socket.emit('create-project', (this.project.projectName))
            console.log(project)
            this.project.projectName = ""
        },
        deleteProject: function (index) {
            // updates list in db
            socket.emit('delete-project', (this.projects[index].name))
            console.log(this.projects[index])

            // updates list in front-end
            this.projects.splice(index, 1)
        },
        editProjectName: function (index, projectName) {
            let oldName = this.projects[index].name
            let newName = projectName
            socket.emit('edit-project-name', oldName, newName)
        },
        showTodos: function (index) {
            this.show = true
            this.todoJSON.name = this.projects[index].name
            this.todoJSON.todos = []
            this.projects[index].todos.forEach(item => {
                if (item.description == "") {
                }
                else {
                    this.todoJSON.todos.push(item)
                }
            })

            // console.log(this.projects[index].todos)
            // this.todoJSON.todos = this.projects[index].todos
        },
        addTodo(todoInputField) {
            //grabbing input box content, and avoid duplicate entry (space and case insensitive)
            if (this.todoJSON.length == 0) {
                socket.emit('add-todo', (this.todoJSON.name, todoInputField))
                this.todoInputField = ""
            }
            else {
                let isDup = false;

                this.todoJSON.todos.forEach(item => {
                    if (item.description.toLowerCase().replace(/\s/g, '') == todoInputField.toLowerCase().replace(/\s/g, '')) {
                        isDup = true
                    }
                })

                if (isDup) {
                    this.todoWarning = true;
                }
                else {
                    // this.todoJSON.push(todoInputField)
                    socket.emit('add-todo', this.todoJSON.name, todoInputField)

                    this.todoInputField = "" //this will reset the input stickiness
                    this.warning = false;
                }
            }
        },
        editTodo(projectName, oldDescription, newDescription) {
            if (oldDescription == newDescription) {
                this.todoWarning = true;
            } else {
                this.todoWarning = false
                this.todoModalField = ""
                this.showModal = false
                socket.emit('edit-todo', projectName, oldDescription, newDescription)
                socket.emit('toggle-todo', projectName, oldDescription, false)
            }
        },
        toggleTodo(projectName, todo, status) {
            this.todoJSON.todos.forEach(item => {
                if (item.description == todo) {
                    item.completed = !status
                }
            })
            socket.emit('toggle-todo', projectName, todo, !status)
        },
        archiveTodo(projectName) {
            socket.emit('remove-completed-todos', projectName)
        }
        ,
        deleteTodo(projectName, description) {
            console.log("i reach here")
            socket.emit('delete-todo', projectName, description)
        },
        toggleTodoModal(description) {
            this.showModal = !this.showModal
            this.todoModalField = description
            this.todoEditOldField = description
        }
    },
    components: {
        'project-component': projectComponent
    },
    mounted: function () {
        socket.on('refresh-projects', projects => {
            this.projects = projects
            console.log(projects)
        })
        socket.on('added-todo', result => {
            for(let index = 0; index < this.projects.length; index++) {
                if(this.projects[index].name === result.name) {
                    this.projects[index].todos = result.todos
                    this.todoJSON = result
                }
            }
        })
        socket.on('existing-todos', result => {
            for(let index = 0; index < this.projects.length; index++) {
                if(this.projects[index].name === result.name) {
                    this.projects[index].todos = result.todos
                    this.todoJSON.todos = result.todos
                }
            }
            console.log(this.todoJSON)
        })

        socket.on('completed-todos', result => {
            if (result == null) {
                this.todoJSON = {}
            } 
            else {
                for (let index = 0; index < this.projects.length; index++) {
                    if (this.projects[index].name === result.name) {
                        this.projects[index].todos = result.todos
                        this.todoJSON = result
                    }
                }
            }
        })

        socket.on('updated-todo', result => {
            if (result == null) {
                this.todoJSON = {}
            } else {
                for (let index = 0; index < this.projects.length; index++) {
                    if (this.projects[index].name === result.name) {
                        this.projects[index].todos = result.todos
                        this.todoJSON = result
                    }
                }
            }
        })

        socket.on('todo-toggled-inProject', result => {
            if (result == null) {
                this.todoJSON = {}
            } else {
                for (let index = 0; index < this.projects.length; index++) {
                    if (this.projects[index].name === result.name) {
                        this.projects[index].todos = result.todos
                        this.todoJSON = result
                    }
                }
            }
        })


        socket.on('project-created', project => {
             this.projects.push(project)
        })

        socket.on('updated-project-name', project => {
            console.log(project)
        })
    }
})

