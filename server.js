const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const Posts = require('./database/model');
const helper = require('./database/helper');

app.use(cors());

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
    res.json(postsList);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});
app.post('/posts', (req, res)=>{
    let newPost = helper.postHelper(req.body);
    Posts.create(newPost)
    .then((post)=>{
        res.json(post);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});
app.put('/posts/:id', (req, res)=>{
    let id = req.params.id;
    let updatedPost = helper.postHelper(req.body);
    Posts.findByIdAndUpdate(id, updatedPost, {new:true})
    .then((post)=>{
        if(post == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(post);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});
app.delete('/posts/:id', (req, res)=>{
    let id = req.params.id;
    Posts.findByIdAndDelete(id)
    .then((post)=>{
        if(post == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(post);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});
app.patch('/posts/:id', (req, res)=>{
    let id = req.params.id;
    Posts.findByIdAndUpdate(id, req.body, {new: true})
    .then((post)=>{
        if(post == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(post);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

module.exports = {
    server: server
};