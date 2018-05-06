import { projectComponent } from './components.js';

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
        todoPreview:{},
        todoInputField: "",
        todoWarning: false,
        show: false
    },
    methods: {
        createProject: function () {
            let projectCopy = {
                projectName: this.project.projectName,
                uniqueId: this.project.uniqueId
            }
            this.project.uniqueId = this.count++
            console.log(projectCopy.uniqueId)
            this.projects.push(projectCopy)
            this.project.projectName = ""
        },
        deleteProject: function (index) {
            console.log(this.projects[index])
            this.projects.splice(index, 1)
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
            this.todoJSON = projects[0]
            this.todoPreview=this.todoJSON.todos.slice(0,4)
        })
        socket.on('added-todo', result => {
            // console.log(result[0].todosInfo)
            this.todoJSON.todos = result[0].todosInfo
            this.todoPreview = this.todoJSON.slice(0,4)

        })
        socket.on('existing-todos', result => {
            this.todoJSON.todos = result[0].todosInfo
            this.todoPreview = this.todoJSON.slice(0,4)
        })

        socket.on('completed-todos', result => {
            this.todoJSON.todos = result[0].todosInfo
            this.todoPreview = this.todoJSON.slice(0,4)
        })
    }
})

