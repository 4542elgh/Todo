module.exports = (server,db)=>{
    const io = require('socket.io')(server);
    io.on('connection',socket=>{
        db.createProject('SampleTodo').then(result=>{
            console.log(result)
        })
    })
}