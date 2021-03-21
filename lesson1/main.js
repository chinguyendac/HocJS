var myBike = {
    name: 'Sirius',
    color: 'Black',
    type: '125cc'
}

var motobikes = [
    'Sirius',
    'Wave',
    'Cub'
]
function User(name,age,phone){
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.getName = function() {
        return this.name;
    }
}

User.prototype.getAge = function() {
    return this.age;
}


var formValues = [
    { field: 'name', value: 'Sơn Đặng' },
    { field: 'age', value: 18 },
    { field: 'address', value: 'Hà Nội' },
]

var listObject = [];

formValues.forEach(function(formValue){
    listObject[formValue.field] = `'${formValue.value}'`;
});

console.log(listObject);


var myString = 'PHP2';
var myArray = ['Javascript', 'PHP', 'Học PHP'];

function findStringsInArrayByKeyword(keyword, strings) {
    var newArray = [];
    strings.filter(function(item) {
        if(item.includes(keyword)) {
            newArray.push(item);
        }
    })
    
    return newArray;
}

console.log(findStringsInArrayByKeyword(myString,myArray));


var inputs = [1,2, [3,4],5,[6,7,8]];

var newInput = inputs.reduce(function(newArray,input){
    return newArray.concat(input);
},[]);

Array.prototype.filter2 = function(callBack) {
    var newOuput = [];
    for(var index in this){
        if(this.hasOwnProperty(index)){
            var result = callBack(this[index],index);
            if(result) {
                newOuput.push(this[index]);
            }
        }
    }
    return newOuput;
}

Array.prototype.forEach2 = function(callBack) {

    for(var index in this) {

        if(this.hasOwnProperty(index)){
            callBack(this[index],index,this);
        }
    }
}

Array.prototype.some2 = function(callBack){
    var count = 0;
    for(var index in this){
        if(this.hasOwnProperty(index)){
            var result = callBack(this[index],index);
            if(result) count ++;
        }
    }
    if (count !== 0) return true;
    return false;
}

var test = document.getElementsByTagName('body');
console.log(test);


var courses = [
    'JSS',
    'PHP',
    'Ruby',
    'PHP'
];


var check = courses.filter2(function(course,index){
    return course === 'PHP';
});

console.log(check);

var checkSome = courses.some2(function(course,index){
    return course === 'JS';
});

console.log(checkSome);

var buttonElement = document.querySelector('#button1');
buttonElement.onclick = function(e) {
    console.log(e.target.value);
}

var inputElement = document.querySelector('input[type="text"]');
inputElement.onkeyup = function(e){
    console.log(e.target.value)
}











