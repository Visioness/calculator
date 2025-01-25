let firstNumber = "";
let secondNumber = "";
let currentNumber = "";
let operator = "";
const maxDigits = 6;

const display = document.querySelector(".display");
const resultPreview = document.querySelector("#result-preview");
const errorMessage = document.querySelector("#error-message");

const point = document.querySelector("#point");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");

const firstNumberSpan = document.querySelector("#firstNumber");
const secondNumberSpan = document.querySelector("#secondNumber");
const operatorSpan = document.querySelector("#operator");

const keys = {
  numbers: [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  operators: ["Enter", "=", "/", "*", "-", "+"],
  helpers: ["Escape", "Backspace"],
}

// Keyboard support!
document.addEventListener("keyup", (event) => {
  if (keys.numbers.includes(event.key)) handleNumbers(event.key);
  else if (keys.operators.includes(event.key)) handleOperators(event.key);
  else if (event.key === keys.helpers[0]) clearDisplay();
  else if (event.key === keys.helpers[1]) undo();

  updateDisplay();
});

clearButton.addEventListener("click", () => {
  clearDisplay();
});

backspaceButton.addEventListener("click", () => {
  undo();
  updateDisplay();
});

numbers.forEach((element) => {
  element.addEventListener("click", () => {
    handleNumbers(element.textContent);
    updateDisplay();
  });
});

operators.forEach((element) => {
  element.addEventListener("click", () => {
    handleOperators(element.textContent);
    updateDisplay();
  });
});


function handleNumbers(input) {
  if (currentNumber.length < maxDigits) {
    currentNumber += input;
    if (isDefined(firstNumber) && !isDefined(operator) && isDefined(currentNumber)) {
      firstNumber = "";
    }
  }
  else toggleErrorMessage();
}


function handleOperators(input) {
  if (input === "Enter") input = "=";
  defineNumbers(input);
}


function defineNumbers(input) {
  if (isDefined(currentNumber)) {
    if (!isDefined(firstNumber)) {
      firstNumber = currentNumber;
    }
    else if (isDefined(currentNumber) && !isDefined(secondNumber)) {
      secondNumber = currentNumber;
      firstNumber = formatNumber(operate(Number(firstNumber), operator, Number(secondNumber)));
      secondNumber = "";
    }
    currentNumber = "";
    operator = input;
  }
  else if (isDefined(firstNumber)) {
    operator = input;
  }
  if (operator === "=") {
    operator = "";
  };
}


function isDefined(number) {
  return number !== "";
}


function formatNumber(number) {
  number = number.toString();
  if (number.indexOf(".") !== -1) {
    if (number.slice(number.indexOf(".") + 1, number.length).length > 2) {
      return Number(number).toFixed(2);
    }
  } 
  return number;
}


function operate(a, operator, b) {
  function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function division(a, b) {
    return a / b;
  }

  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return division(a, b);
}


function undo() {
  if (isDefined(firstNumber)) {
    if (isDefined(currentNumber)) {
      currentNumber = currentNumber.slice(0, -1);
    } else if (isDefined(operator)){
      operator = operator.slice(0, -1);
      currentNumber = firstNumber;
      firstNumber = "";
      operatorSpan.textContent = operator;
    }
  } else if (isDefined(currentNumber)) {
    currentNumber = currentNumber.slice(0, -1);
  }
}


function toggleErrorMessage() {
  errorMessage.textContent = "You can not use numbers that has more than 6 digits!";
  setTimeout(() => errorMessage.textContent = "", 4000);
}


function clearDisplay() {
  firstNumber = secondNumber = currentNumber = operator = "";
  resultPreview.textContent = firstNumberSpan.textContent = secondNumberSpan.textContent = operatorSpan.textContent = "";
  point.disabled = false;
}


function updateDisplay() {
  if (currentNumber.includes(".")) point.disabled = true;
  else point.disabled = false;
  
  if (isDefined(firstNumber)) {
    firstNumberSpan.textContent = firstNumber;
    operatorSpan.textContent = operator;
    if (isDefined(secondNumber)) {
      secondNumberSpan.textContent = secondNumber;
    } else if (isDefined(currentNumber)) {
      secondNumberSpan.textContent = currentNumber;
      resultPreview.textContent = formatNumber(operate(Number(firstNumber), operator, Number(currentNumber)));
    } else {
      secondNumberSpan.textContent = currentNumber;
      resultPreview.textContent = "";
    }
  } else {
    firstNumberSpan.textContent = currentNumber;
  }
}
