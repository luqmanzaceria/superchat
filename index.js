const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    socket.broadcast.emit('user-connection', '*a user connected*');
    console.log("*a user connected*")

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnection','*user disconnected*');
        console.log("*a user disconnected*")
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});