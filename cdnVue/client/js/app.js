import { header, card, add } from './components.js';;

let socket = io()
new Vue({
    el: '#app',
    components: {
        'card': card,
        'parallex-header' : header,
        'add-project': add
    }
})

// reuse chat-app code

// Client Side Socket Event
// socket.on('refresh-messages', messages => {
//     app.messages = messages
// })
// socket.on('refresh-users', users => {
//     app.users = users
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

