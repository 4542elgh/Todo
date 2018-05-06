const projectComponent = {
    template: 
    `
        <div class="wide-card mdl-card mdl-shadow--2dp">
            <div  v-show = "project.edit == false" class="mdl-card__title">
                <h2 @dblclick = "project.edit = true" class="mdl-card__title-text">{{ projectname }}</h2>
                <input v-show = "project.edit == true" v-model="project.projectname" v-on:blur= "project.edit=false; $emit('update')" @keyup.enter = "todo.edit=false; $emit('update')">
            </div>

            <div class="mdl-card__supporting-text">
                <ul v-for="i in 4">
                    <li>show active todo</li>
                </ul>
            </div>

            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Open {{ projectname }}</a>
            </div>
            
            <div class="mdl-card__menu">
                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">delete</i>
                </button>
            </div>
        </div>
    `,
    props: ['projectname', 'project', 'project.edit'],
    methods: {
        callParentToDelete: function (projectName) {
            this.$parent.$options.methods.deleteProject(projectName)
        },
        callParentToDelete: function (projectName) {
            this.$parent.$options.methods.editProject(projectName)
        }
    }
}

let socket = io()
const app = new Vue({
    el: '#app',
    data: {
        project: {
            projectName: '',
            edit: false,
            todos: []
        },
        editedProject: "",
        projects: [],
    },
    methods: {
        createProject: function () {
            this.projects.push(this.project.projectName)
            this.project.projectName = ""
        },
        deleteProject: function (projectName) {
            delete app.projects[app.projects.indexOf(projectName)]
            console.log("delete " + projectName)
        },
        editProject: function (projectName) {
            this.projects[this.project.projectName] = projectName
            console.log("inside edit fn " + projectName)
        }

    },
    components: {
        'project-component': projectComponent
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

