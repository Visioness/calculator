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
  });
});

operators.forEach((element) => {
  element.addEventListener("click", () => {
    operator = element.textContent;
    console.log(operator);
  });
});

allButtons.forEach((element) => {
  element.addEventListener("click", () => {
    updateDisplay();
  });
});


function updateDisplay() {
  const expression = [firstNumber, operator, secondNumber];
  display.textContent = expression.join(" ");
  console.log(`|${display.textContent}|`)
}

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

function operate(a, operator, b) {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return division(a, b);
}