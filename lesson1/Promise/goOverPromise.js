var users = [
    {
        id: 1,
        name: 'Dac Chi',
    },
    {
        id: 2,
        name: 'Hieu Be'
    },
    {
        id: 3,
        name: 'Khai'
    },
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Alo'
    },
    {
        id: 2,
        user_id: 2,
        content: 'Blo'
    },
    {
        id: 3,
        user_id: 1,
        content: 'Clo'
    },
]

function getComments() {
    return new Promise(function(resolve,reject){
        resolve(comments);
    })
}

function getUserByIds(userIds) {
    return new Promise(function(resolve,reject){
        var result = users.filter(function(user){
            return userIds.includes(user.id);
        });
        resolve(result);
    })
}

getComments()
    .then(function(comments){
        var userIds = comments.map(function(comment){
            return comment.user_id;
        });
        return getUserByIds(userIds)
            .then(function(users){
                return {
                    users: users,
                    comments: comments,
                }
            })   
    })
    .then(function(data){
        var blockContent = document.querySelector('.content-box');
        
        var html = data.comments.map(function(comment){
            var user = data.users.find(function(user){
                return user.id === comment.user_id;
            })
            return `<li>${user.name}: ${comment.content}</li>`
        });
        blockContent.innerHTML = html;
    })

