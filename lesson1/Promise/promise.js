var users = [
    {
        id: 1,
        name: 'Dac Chi',
    },
    {
        id: 2,
        name: 'Duc Khai',
    },
    {
        id: 3,
        name: 'Son Ha',
    }
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Alo',
    },
    {
        id: 2,
        user_id: 2,
        content: 'Blo',
    },
    {
        id: 3,
        user_id: 1,
        content: 'Clo',
    },
];

//Fake API lấy ra comments
function getComments() {
    return new Promise(function(resolve,reject){
        resolve(comments);
    });
}

//Lấy ra user tương ứng với comment
function getUsersByIds(userIds){
    return new Promise(function(resolve){
        var result = users.filter(function(user) {
            return userIds.includes(user.id);
        });
        resolve(result);
    });
}

getComments()
    .then(function(comments){
        var userIds = comments.map(function(comment){
            return comment.user_id;
        });
        //Trả về user và comment
        return getUsersByIds(userIds)
            .then(function(users){
                return {
                    users: users,
                    comments: comments,
                };
            })
    })

    .then(function(data) {
        console.log(data);
        var contentBoxElements = document.querySelector('.content-box');
        var html = '';
        // duyệt qua từng comment là lấy ra user tương ứng với mỗi comment
        data.comments.forEach(function(comment){
            var user = data.users.find(function(user){
                return user.id === comment.user_id;
            })
            html += `<li>${user.name}: ${comment.content}</li>`;
        });
        contentBoxElements.innerHTML = html;
    })


var postAPI = 'https://jsonplaceholder.typicode.com/posts';

fetch(postAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(post){
        console.log(post);
    })




