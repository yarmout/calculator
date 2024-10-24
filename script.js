// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Operate based on the given operator
const operate = (a, b, operator) => {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

const calcDisplay = document.querySelector("#calculator-display");
const numpad = document.querySelectorAll(".btn-number");
const operations = document.querySelectorAll(".btn-operation");
const clearBtn = document.querySelector(".btn-clear");
const equalsBtn = document.querySelector(".btn-equals");

let operator = null;
let clearOnNextInput = false;
let operatorEntered = false;

// Update display function
const updateDisplay = (content) => {
    calcDisplay.textContent = content;
}

// Clear display and reset state
const clearDisplay = () => {
    clearOnNextInput = false;
    operatorEntered = false;
    updateDisplay('0');
}

// Number button event listeners
numpad.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        const currentDisplayValue = calcDisplay.textContent;
        const buttonText = numberButton.textContent;

        // Clear or update the display based on the current state
        if (clearOnNextInput) clearDisplay(buttonText);
        else updateDisplay(currentDisplayValue === '0' ? buttonText : currentDisplayValue + buttonText);
    });
});

// Operator button event listeners
operations.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        const currentDisplayValue = calcDisplay.textContent;
        if (clearOnNextInput) clearDisplay(); // Reset state
        if (operatorEntered) return; // Prevent multiple operator entries

        operator = operationButton.textContent;
        operatorEntered = true;
        updateDisplay(currentDisplayValue + operator);
    });
});

// Clear button event listener
clearBtn.addEventListener("click", clearDisplay);

// Equals button event listener
equalsBtn.addEventListener("click", () => {
    if (clearOnNextInput) return;
    [firstNumber, secondNumber] = calcDisplay.textContent.split(operator).map(Number);
    if (firstNumber === null || secondNumber === null || operator === null) return;

    const result = operate(firstNumber, secondNumber, operator);
    clearOnNextInput = true;
    updateDisplay(result);
});