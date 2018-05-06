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
        todos: [],

        todoJSON: [],
        todoInputField: "",
        todoWarning: false
    },
    methods: {
        createProject: function () {
            let copy = {
                projectName: this.project.projectName,
                uniqueId: this.project.uniqueId
            }
            this.project.uniqueId = this.count++
            console.log(copy.uniqueId)
            this.projects.push(copy)
            this.project.projectName = ""
        },
        deleteProject: function (index) {
            console.log(this.projects[index])
            this.projects.splice(index, 1)
        },
        addTodo(todoInputField) { //grabbing input box content, and avoid duplicate entry (space and case insensitive)

            if (this.todoJSON.length == 0) {
                socket.emit('add-todo', (this.todoJSON.name, todoInputField))
                this.todoInputField = ""
            }
            else {
                let isDup=false;

                this.todoJSON.todos.forEach(item => {
                    if (item.description.toLowerCase().replace(/\s/g, '') == todoInputField.toLowerCase().replace(/\s/g, '')){
                        isDup=true
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
        deleteTodo (projectName,description) {
            socket.emit('delete-todo',projectName,description)
        }
    },
    components: {
        'project-component': projectComponent
    },
    mounted () {
        socket.on('refresh-projects', projects => {
            this.todoJSON=projects[0]
        })
        socket.on('added-todo', result => {
            this.todoJSON.todos = result
        })
        socket.on('existing-todos', result => {
            this.todoJSON.todos = result
        })
    }
})


// Client Side Socket Event
// socket.on('refresh-projects', projects => {
//     app.projects = projects
//     console.log('client-side, refresh-projects')
// })

// socket.on('create-project', project => {
//     if (user.projectName !== project.name) {
//         app.project.projectName = user.projectName
//         app.projects.push(project)
//     }

// })

// socket.on('successful-join', user => {
//     // the successful-join event is emitted on all connections (open browser windows)
//     // so we need to ensure the loggedIn is set to true and user is set for matching user only
//     if (user.name === app.userName) {
//         app.user = user
//         app.loggedIn = true
//     }
//     app.isError = false
//     app.users.push(user)
// })

// // handles failed-join when username's name are not unique
// socket.on('failed-join', user => {
//     app.isError = true
//     app.error = `Sorry, ${user.name} is already taken.`
// })

// socket.on('successful-message', content => {
//     // clear the message after success send
//     app.message = ''
//     app.messages.push(content)
// })

