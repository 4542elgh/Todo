import { projectComponent } from './components.js'

let socket = io()
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
        todoWarning: false,
        show: false
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
        showTodos: function (index) {
            this.show = true
            this.todoJSON.name = this.projects[index].name
            this.todoJSON.todos = this.projects[index].todos
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
                    if (item.description.toLowerCase().replace(/\s/g, '') == todoInputField.toLowerCase().replace(/\s/g, '')){
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
        editTodo () {},
        toggleTodo (projectName, todo, status) {
            this.todoJSON.todos.forEach(item => {
                if (item.description == todo){
                    item.completed =! status
                }
            })
            socket.emit('toggle-todo', projectName, todo, !status)
        },
        archiveTodo(projectName){
            socket.emit('remove-completed-todos', projectName)
        }
        ,
        deleteTodo (projectName,description) {
            socket.emit('delete-todo', projectName, description)
        }
    },
    components: {
        'project-component': projectComponent
    },
    mounted: function () {
        socket.on('refresh-projects', projects => {
            // this.todoJSON = projects[0]
            // this.todoPreview = this.todoJSON.todos.slice(0,4)
            this.projects = projects
            console.log(projects)
        })
        socket.on('added-todo', result => {
            // this.todoJSON.todos = result[0].todosInfo
            // let preview = this.todoJSON.todos.slice(0,4)
            // this.todoPreview = preview
            for(let index = 0; index < this.projects.length; index++) {
                if(this.projects[index].name === result.name) {
                    this.projects[index].todos = result.todos
                    this.todoJSON.todos = result.todos
                }
            }
        })
        socket.on('existing-todos', result => {
            this.todoJSON.todos = result[0].todosInfo
            let preview = this.todoJSON.todos.slice(0,4)
            this.todoPreview = preview
        })

        socket.on('completed-todos', result => {
            this.todoJSON.todos = result[0].todosInfo
            let preview = this.todoJSON.todos.slice(0,4)
            this.todoPreview = preview
        })

        socket.on('project-created', project => {
            //  let projectCopy = {
            //      name: project['name'],
            //      uniqueId: project['_id']
            //  }
            //      console.log(projectCopy.uniqueId)
             this.projects.push(project)
        })
    }
})

