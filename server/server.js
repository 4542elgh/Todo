const  express = require('express'),
        app = express(),
        server = require('http').Server(app),
        path = require('path')

app.use(express.static(path.join(__dirname, '..', '/client')))

server.listen(8080)