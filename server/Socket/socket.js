module.exports = (server,db)=>{
    const io = require('socket.io')(server);
    io.on('connection',socket=>{
        console.log(socket.id);
    })
}