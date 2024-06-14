let value1 = 0;
let value2 = 0;
let operator = '';
let decimal = false;
let displayVal = 0;
let computation = 0;
let state = 'first';
let first = false;
let second = false;

let display = document.querySelector('.display');
let number = document.querySelectorAll('.number');
let operand = document.querySelectorAll('.operator');
let negateBtn = document.querySelector('.negate');
let computeBtn = document.querySelector('.compute');
let decimalBtn = document.querySelector('.decimal');
let clearBtn = document.querySelector('.clear');
let undoBtn = document.querySelector('.undo');
let percentBtn = document.querySelector('.percent');

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
        let result = divide(value1, value2);
        if (value1 % value2 !== 0) {
            decimal = true;
        }
        return result;
    } else {
        return;
    }
};

number.forEach((element) => {
    element.addEventListener('click', (event) => {
        undoBtn.classList.remove('disabled');
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
            decimal = false;
            event.target.classList.add('active');
        } else if (state ==='second' && second === true) {
            operand.forEach((element) => {
                element.classList.remove('active');
            });
            event.target.classList.add('active');
            value2 = parseFloat(displayVal);
            console.log(value1, operator, value2)
            computation = operate(operator, value1, value2);
            second = false;
            value1 = parseFloat(computation);
            value2 = 0;
            decimal = false;       
            operator = event.target.textContent;
            display.textContent = `${computation}`;
            undoBtn.classList.add('disabled');
        } else if (state ==='second' && second === false) {
            if (computation === 0) {
                event.target.classList.remove('active');
                state = 'first';
                operator = '';
                if (String(displayVal).includes('.')) {
                    decimal = true;
                }
            } else {
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active');
                    operator = '';
                    if (String(displayVal).includes('.')) {
                        decimal = true;
                    }
                } else {
                    operand.forEach((element) => {
                        element.classList.remove('active');
                    });
                    event.target.classList.add('active');
                    operator = event.target.textContent;
                }
            }
        };
    });
});

negateBtn.addEventListener('click', () => {
    displayVal = negate(parseFloat(displayVal));
    display.textContent = `${displayVal}`;
});

clearBtn.addEventListener('click', () => {
    displayVal = 0;
    value1 = 0;
    value2 = 0;
    operator = '';
    decimal = false;
    computation = 0;
    second = false;
    first = false;
    display.textContent = `${displayVal}`;
    operand.forEach((element) => {
        element.classList.remove('active');
    });
    state = 'first';
});

computeBtn.addEventListener('click', () => {
    if (state === 'second' && second === true) {
        operand.forEach((element) => {
            element.classList.remove('active');
        });
        value2 = parseFloat(displayVal);
        computation = operate(operator, value1, value2);
        console.log(value1, operator, value2)
        operator = '';
        display.textContent = `${computation}`;
        displayVal = computation;
        value1 = 0;
        value2 = 0;
        state = 'first';
        first = false;
        second = false;
        decimal = false;
        undoBtn.classList.add('disabled')
    }
});

decimalBtn.addEventListener('click', () => {
    if (!decimal) {
        if (state === 'first' && first === false) {
            displayVal = '0.';
            decimal = true;
            first = true;
        }else if (state === 'second' && second === false) {
            displayVal = '0.';
            decimal = true;
            second = true;
        } else {
        displayVal += '.';
        decimal = true;
        }
    }
    display.textContent = `${displayVal}`;
});

undoBtn.addEventListener('click', () => {
    if (undoBtn.classList.contains('disabled') === false) {
    displayVal = displayVal.slice(0, -1);
    let deletedChar = displayVal.slice(-1);
    if (deletedChar === '.') {
        decimal = false;
    } else if (displayVal === '') {
        if (state === 'first') {
            first = false;
        } else if (state ==='second') {
            second = false;
        }
        displayVal = 0;
        undoBtn.classList.add('disabled');
    }
    display.textContent = `${displayVal}`
    }
});

percentBtn.addEventListener('click', () => {
    displayVal = percent(parseFloat(displayVal));
    display.textContent = `${displayVal}`;
    if (String(displayVal).includes('.')) {
    decimal = true;
    }
});