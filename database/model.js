const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {type: String, default: ''},
    message: {type: String, default: ''},
    likes: {type: Number, default: 0}
});

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;