const URL = `127.0.0.1:8080`;

var app = new Vue({
    el: "#app",
    data: {
        userName: '',
        userPost: '',
        newestPostId: '',
        posts: [],
    },
    methods: {
        submitPost: function () {
            let newPost = {
                'user': this.userName,
                'message': this.userPost
            }
            this.postPosts(newPost);
            this.getPosts();

            this.userName = '';
            this.userPost = '';
        },
        likePost: function (post) {
            let id = post._id;
            let likes = post.likes;
            likes += 1;
            this.patchPost(id, likes);
        },
        postPost: function (newPost) {
            fetch(URL + '/posts', {
                method: "POST",
                body: JSON.stringify(newPost),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                response.json().then((createdPost) => {
                    this.newestPostId = createdPost._id;
                    this.getPosts
                })
            })
        },
        getPosts: function () {
            fetch(URL + '/posts').then((response)=>{
                response.json().then((data)=>{
                    this.posts = data;
                })
            })
        },
        patchPosts: function (id, likes) {
            fetch(URL + '/posts/' + id, {
                method: "PATCH",
                body: JSON.stringify(likes),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response)=>{
                response.json().then((data)=>{
                    this.newestPostId = data._id;
                    this.getPosts();
                });
            });
        },
        deletePost: function (id) {
            fetch(URL + '/posts/' + id, {
                method: "DELETE",
            }).then((response)=>{
                if(response.status==200){
                    console.log(`deleted post ${id}`);
                    this.getPosts();
                }
            });
        },
    },
    created: function() {
        this.getPosts();
    }
});