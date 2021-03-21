
var courseApi = 'http://localhost:3000/courses';

function start(){
    getCourses(renderCourses);
    handleCreate();
}

start();

//Function

function getCourses(callback) {
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function createCourses(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    fetch(courseApi,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)

}

function handleDeleteCourses(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + '/' + id,options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem) {
                courseItem.remove();
            }
        })
}

function updateCourses(id,data) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    fetch(courseApi + '/' + id,options)
        .then(function(response){
            return response.json();
        })
        .then(getCourses(renderCourses))
}

function handleChangeCourses(id){
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');
    var nameUpdate = document.querySelector('.course-item-name-' + id);
    var descriptionUpdate = document.querySelector('.course-item-description-' + id);
    name.value = nameUpdate.textContent;
    description.value = descriptionUpdate.textContent;
    var btnCreateToChange =  document.querySelector('#create');
    btnCreateToChange.textContent = 'Cập nhập';
    btnCreateToChange.onclick = function() {
        var formData = {
            name: name.value,
            description: description.value,
        };
        updateCourses(id,formData);
    }
}

function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
    var html = courses.map(function(course){
        return `<li class="course-item-${course.id}">
        <h2 class="course-item-name-${course.id}">${course.name}</h2>
        <p class="course-item-description-${course.id}">${course.description}</p>
        <button onclick="handleDeleteCourses(${course.id})">Xóa</button>
        <button onclick="handleChangeCourses(${course.id})">Chỉnh sửa</button>
        </li>`
    });
    listCoursesBlock.innerHTML = html.join('');
}

function handleCreate() {
    var btnCreate = document.querySelector('#create');
    btnCreate.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description,
        }
        createCourses(formData,function(){
            getCourses(renderCourses);
        });
    }
}