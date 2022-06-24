postHelper = function (post) {
    return{
        "user": post.user || '',
        "message": post.message || '',
        "likes": 0,
    }
};

module.exports = {
    postHelper: postHelper,
};