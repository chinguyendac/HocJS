
function Validator(options) {

    var selectorRules = {};


    //Validate các trường
    function validate(inputElements,rule) {
        var errorMessage;
        var errorElement = inputElements.parentElement.querySelector(options.messageText);
        
        var rules = selectorRules[rule.selector];

        for(var i = 0; i< rules.length; i++) {
            errorMessage = rules[i](inputElements.value);
            if(errorMessage) break;
        }
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElements.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElements.classList.remove('invalid');
        }
        return errorMessage;
    }
    
    //Lấy element form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement) {
        
        //Validate các input khi submit
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var formValid = true;
            options.rules.forEach(function(rule){
                var inputElements = formElement.querySelector(rule.selector);
                var isValid = validate(inputElements,rule);
                if (isValid) formValid = false;   
            });
            if(formValid) {
                if(typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValue = Array.from(enableInputs).reduce(function(values,input){
                        return (values[input.name] = input.value) && values;
                    },{});
                    options.onSubmit(formValue);
                }
            }
        }

        //Duyệt qua rừng rule và lắng nghe sự kiện
        options.rules.forEach(function(rule){

            var inputElements = formElement.querySelector(rule.selector);
            
            
            //Lưu các function test
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            };

            if(inputElements) {

                //Lắng nghe sự kiện khi blur
                inputElements.onblur = function() {
                    validate(inputElements,rule);
                }

                //Lắng nghe sự kiện khi đang nhập
                inputElements.oninput = function() {
                    var errorElement = inputElements.parentElement.querySelector(options.messageText);
                    errorElement.innerText = '';
                    inputElements.classList.remove('invalid');
                }
            }
        });

    }

}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return (value.length > min) ? undefined : `Vui lòng nhập nhiều hơn ${min} kí tự`;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmed, message) {
    return {
        selector: selector,
        test: function(value) {
            return (value ===  getConfirmed()) ? undefined : message || 'Dữ liệu nhập vào không chính xác';
        }
    }
}