let firstNumber = "";
let secondNumber = "";
let currentNumber = "";
let operator = "";

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const allButtons = document.querySelectorAll("button");

numbers.forEach((element) => {
  element.addEventListener("click", () => {
    currentNumber += element.textContent;
    console.log(currentNumber);
    updateDisplay();
  });
});

operators.forEach((element) => {
  element.addEventListener("click", () => {
    defineNumber();
    operator = element.textContent;
    console.log(operator);
    updateDisplay();
  });
});

function defineNumber() {
  if (firstNumber === "") {
    firstNumber = currentNumber;
  } else if (secondNumber === "" && operator !== "=") {
    secondNumber = currentNumber;
    firstNumber = operate(Number(firstNumber), operator, Number(secondNumber));
    secondNumber = "";
  }
  currentNumber = ""
}

function updateDisplay() {
  if (firstNumber === "") display.textContent = `${currentNumber}`;
  else if (operator === "=") display.textContent = `${firstNumber}`;
  else if (operator !== "") display.textContent = `${firstNumber} ${operator} ${currentNumber}`;
  else if (secondNumber === "") display.textContent = `${firstNumber} ${operator} ${currentNumber}`;
  console.log(`|${display.textContent}|`);
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