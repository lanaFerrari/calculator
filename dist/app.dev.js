"use strict";

var calculation = {
  display: "",
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: ""
};
var currentValue = "";
var buttons = document.querySelectorAll("button");

var updateResult = function updateResult() {
  var display = document.querySelector(".calculator-screen");
  display.value = calculation.display;
};

var calculate = function calculate(result, operator, firstN, secondN) {
  console.log("first", firstN);
  console.log("second", secondN);
  console.log("result", result);

  if (firstN && secondN && !result) {
    if (operator == "+") {
      currentValue = Number(secondN) + Number(firstN);
    } else if (operator === "-") {
      currentValue = Number(secondN) - Number(firstN);
    } else if (operator === "/") {
      currentValue = Number(secondN) / Number(firstN);
    } else if (operator === "*") {
      currentValue = Number(secondN) * Number(firstN);
    }

    calculation.firstNumber = "";
    calculation.secondNumber = "";
  } else if (result) {
    if (operator == "+") {
      currentValue = Number(result) + Number(firstN);
    } else if (operator === "-") {
      currentValue = Number(result) - Number(firstN);
    } else if (operator === "/") {
      currentValue = Number(result) / Number(firstN);
    } else if (operator === "*") {
      currentValue = Number(result) * Number(firstN);
    }
  }

  console.log("currentValue", currentValue);
  calculation.result = currentValue;
  calculation.display = calculation.result;
  updateResult();
};

buttons.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    if (item.classList.contains('number')) {
      if (calculation.value) {
        calculation.firstNumber += item.value;
        calculation.display = item.value;
        updateResult();
      }

      calculation.firstNumber += item.value;
      calculation.display += item.value;
      updateResult();
    } else if (item.classList.contains('operator')) {
      if (!calculation.secondNumber) {
        calculation.operator = item.value;
        calculation.secondNumber = calculation.firstNumber;
        calculation.firstNumber = "";
        calculation.display += item.value;
        updateResult();
      } else {
        calculation.display += item.value;
        updateResult();
        calculate(calculation.result, calculation.operator, calculation.firstNumber, calculation.secondNumber);
      }
    } else if (item.classList.contains('clear')) {
      calculation = {
        display: "",
        firstNumber: "",
        operator: "",
        result: ""
      };
      updateResult();
    } else if (item.classList.contains('equal')) {
      calculate(calculation.result, calculation.operator, calculation.firstNumber, calculation.secondNumber);
      calculation = {
        display: "",
        firstNumber: "",
        operator: "",
        result: ""
      };
    }
  });
});