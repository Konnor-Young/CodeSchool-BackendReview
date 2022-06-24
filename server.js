const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const Posts = require('./database/model');
const helper = require('./database/helper');

app.use(express.json());

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

app.get('/posts', (req, res)=>{
    Posts.find()
    .then((postsList)=>{
    res.send(postsList);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});
app.post('/posts', (req, res)=>{
    let newPost = helper.postHelper(req.body);
    Posts.create(newPost)
    .then((post)=>{
        res.send(post);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

module.exports = {
    server: server
};