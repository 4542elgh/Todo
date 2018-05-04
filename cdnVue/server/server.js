const  express = require('express'),
        app = express(),
        server = require('http').Server(app),
        path = require('path'),
        db = require('./Database/db'),
        socket = require('./Socket/socket')(server,db)

app.use(express.static(path.join(__dirname, '..', '/client')))

server.listen(8080)