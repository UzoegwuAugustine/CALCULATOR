const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let currentInput = '';
let operator = '';
let operand1 = null;

function updateDisplay(value) {
    display.textContent = value;
}

function calculateResult() {
    let operand2 = parseFloat(currentInput);
    if (isNaN(operand1) || isNaN(operand2)) return;

    switch (operator) {
        case '+': currentInput = (operand1 + operand2).toString(); break;
        case '-': currentInput = (operand1 - operand2).toString(); break;
        case '×': currentInput = (operand1 * operand2).toString(); break;
        case '÷': 
            currentInput = operand2 === 0 ? 'Error' : (operand1 / operand2).toString(); 
            break;
        case '%': currentInput = (operand1 % operand2).toString(); break;
    }

    operator = '';
    operand1 = null;
    updateDisplay(currentInput);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            updateDisplay(currentInput);
        } else if (value === 'C') {
            currentInput = '';
            operand1 = null;
            operator = '';
            updateDisplay('0');
        } else if (value === '↩') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        } else if (value === '+/-') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay(currentInput);
            }
        } else if (value === '=') {
            calculateResult();
        } else {
            if (currentInput === '') return;
            operand1 = parseFloat(currentInput);
            operator = value;
            currentInput = '';
        }
    });
});

updateDisplay('0');
