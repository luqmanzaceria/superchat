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

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    socket.broadcast.emit('user-connection', '*a user connected*');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnection','*user disconnected*');
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});