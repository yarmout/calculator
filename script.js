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
const decimalBtn = document.querySelector(".btn-decimal");
const backspaceBtn = document.querySelector(".btn-backspace");
const body = document.querySelector('body');

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

// Round the decimals of the result to fit within the display
const roundResult = (result) => {
    const totalNumberOfDigits = result.toString().replace('.', '').replace('-', '').length;
    const numberOfDigitsBeforeDecimal = Math.abs(Math.trunc(result)).toString().length;

    if (totalNumberOfDigits > 10 && numberOfDigitsBeforeDecimal < 10) {
        // Shorten length of number to 10 digits by rounding the decimal
        result = result.toFixed(10 - numberOfDigitsBeforeDecimal);
    }
    return result;
}

const handleNumberInput = (input) => {
    const currentDisplayValue = calcDisplay.textContent;

    if (clearOnNextInput) clearDisplay(input);
    else updateDisplay(currentDisplayValue === '0' ? input : currentDisplayValue + input);
}

const handleOperatorInput = (input) => {
    const currentDisplayValue = calcDisplay.textContent;
    if (clearOnNextInput) clearDisplay(); // Reset state
    if (operatorEntered) return; // Prevent multiple operator entries

    operator = input;
    updateDisplay(currentDisplayValue + operator);
    operatorEntered = true;
}

const handleClickEquals = () => {
    if (clearOnNextInput) return;
    [firstNumber, secondNumber] = calcDisplay.textContent.split(operator).map(Number);
    if (firstNumber === null || secondNumber === null || operator === null) return;

    const result = operate(firstNumber, secondNumber, operator);
    let roundedResult = roundResult(result);
    clearOnNextInput = true;
    updateDisplay(roundedResult);
}

const handleClickBackspace = () => {
    const currentDisplayValue = calcDisplay.textContent;
    if (clearOnNextInput) clearDisplay(); // Reset state

    const newDisplayValue = currentDisplayValue.length > 1 ? currentDisplayValue.slice(0, -1): '0';
    updateDisplay(newDisplayValue);
}

const handleClickDecimal = () => {
    const currentDisplayValue = calcDisplay.textContent;
    if (currentDisplayValue.includes('.')) return;
    if (clearOnNextInput) clearDisplay(); // Reset state

    updateDisplay(currentDisplayValue + '.');
}

// Number button event listeners
numpad.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        handleNumberInput(numberButton.textContent);
    });
});

// Operator button event listeners
operations.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        handleOperatorInput(operationButton.textContent);
    });
});

// Clear button event listener
clearBtn.addEventListener("click", clearDisplay);

// Equals button event listener
equalsBtn.addEventListener("click", handleClickEquals);

// Backspace button event listener
backspaceBtn.addEventListener("click", handleClickBackspace);

// Decimal button event listener
decimalBtn.addEventListener("click", handleClickDecimal);

// Listen for key presses
body.addEventListener('keydown', (event) => {
    const keyPress = event.key;

    if (keyPress >= '0' && keyPress <= '9') {
        handleNumberInput(keyPress);
    }
    else {
        switch (keyPress) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperatorInput(keyPress);
                break;
            case '=':
            case 'Enter':
                event.preventDefault();
                handleClickEquals();
                break;
            case 'Backspace':
                handleClickBackspace();
                break;
            case '.':
                handleClickDecimal();
                break;
            default:
                console.log(`Other key pressed: ${keyPress}`);
                break;
        }
    }
});


