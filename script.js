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

let value1 = 0;
let value2 = 0;
let operator = '';
let decimal = false;
let displayVal = 0;

const operate = function(operator, value1, value2) {
    if (operator === 'add') {
        displayVal = add(value1, value2);
    } else if (operator ==='subtract') {
        displayVal = subtract(value1, value2);
    } else if (operator ==='multiply') {
        displayVal = multiply(value1, value2);
    } else if (operator === 'divide') {
        displayVal = divide(value1, value2);
    } else {
        return;
    }
};

