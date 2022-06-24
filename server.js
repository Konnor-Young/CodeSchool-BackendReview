const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const Post = require('./database/model');

app.get('/global', (req, res)=>{
    res.sendFile(__dirname+"/chat.html");
});
io.on('connection', (socket)=>{
    console.log("a new user connected");
    socket.on('chat message', (msg)=>{
        console.log(msg);
        io.emit('chat message', msg);
    })
    socket.on('disconnect', ()=>{
        console.log("user disconnected");
    })
});

module.exports = {
    server: server
};