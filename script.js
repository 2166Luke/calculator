let value1 = 0;
let value2 = 0;
let operator = '';
let decimal = true;
let displayVal = 0;
let computation = 0;
let state = 'first';
let first = false;
let second = false;

let display = document.querySelector('.display');
let number = document.querySelectorAll('.number');
let operand = document.querySelectorAll('.operator');


display.textContent = `${displayVal}`;


/**Math functions for calculator */

const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

const percent = function(n) {
    return n / 100;
}

const negate = function(n) {
    return n * -1;
}

const operate = function(operator, value1, value2) {
    if (operator === '+') {
        return add(value1, value2);
    } else if (operator ==='-') {
        return subtract(value1, value2);
    } else if (operator ==='*') {
        return multiply(value1, value2);
    } else if (operator === '/') {
        return divide(value1, value2);
    } else {
        return;
    }
};

number.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (first === false && state === 'first') {
            displayVal = event.target.textContent;
            first = true;
        } else if (first === true && state === 'first') {
            displayVal += event.target.textContent;
        } else if (second === false && state ==='second') {
            displayVal = event.target.textContent;
            second = true;
        } else if (second === true && state ==='second') {
            displayVal += event.target.textContent;
        }
        display.textContent = `${displayVal}`;
    });
});

operand.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (state === 'first') {
            value1 = parseFloat(displayVal);
            operator = event.target.textContent;
            state ='second';
            event.target.classList.add('active');
        } else if (state ==='second' && second === true) {
            operand.forEach((element) => {
                element.classList.remove('active');
            });
            event.target.classList.add('active');
            value2 = parseFloat(displayVal);
            console.log(operator, value1, value2)
            computation = operate(operator, value1, value2);
            second = false;
            value1 = parseFloat(computation);
            value2 = 0;            
            operator = event.target.textContent;
            display.textContent = `${computation}`;
        } else if (state ==='second' && second === false) {
            event.target.classList.remove('active');
            state = 'first';
            operator = '';
        };
    });
});
