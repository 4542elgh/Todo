import { projectComponent } from './components.js';

let socket = io()
const app = new Vue ({
    el: '#app',
    data: {
        project: {
            projectName: ''
        },
        projects: [],
        todos: []
    },
    methods: {

    },
    components: {
        'project': projectComponent
    }
})

// Client Side Socket Event
socket.on('refresh-projects', projects => {
    app.projects = projects
    console.log('client-side, refresh-projects')
})

socket.on('create-project', project => {
    if (user.projectName !== project.name) {
        app.project.projectName = user.projectName
        app.projects.push(project)
    }
   
})

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

