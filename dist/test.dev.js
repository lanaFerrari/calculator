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

  if (firstN && secondN) {
    if (operator == "+") {
      currentValue = Number(firstN) + Number(secondN);
    } else if (operator === "-") {
      currentValue = Number(firstN) - Number(secondN);
    } else if (operator === "/") {
      currentValue = Number(firstN) / Number(secondN);
    } else if (operator === "*") {
      currentValue = Number(firstN) * Number(secondN);
    }

    calculation.firstNumber = "";
    calculation.secondNumber = "";
  } else if (result) {
    if (operator == "+") {
      currentValue = Number(result) + Number(firstNumber);
    } else if (operator === "-") {
      currentValue = Number(result) - Number(firstNumber);
    } else if (operator === "/") {
      currentValue = Number(result) / Number(firstNumber);
    } else if (operator === "*") {
      currentValue = Number(result) * Number(firstNumber);
    }
  }

  console.log("currentValue", currentValue);
  calculation.display = currentValue;
  calculation.result = currentValue;
  updateResult();
};

buttons.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    if (item.classList.contains('number')) {
      console.log("Click on number", item.value);

      if (!calculation.secondNumber) {
        calculation.firstNumber += item.value;
        calculation.display += item.value;
        updateResult();
      } else {
        // calculate(calculation.result, calculation.operator, calculation.firstNumber, calculation.secondNumber);
        calculation.firstNumber += item.value;
        calculation.display += item.value;
        updateResult();
      }
    } else if (item.classList.contains('operator')) {
      console.log("operator", item.value);
      calculation.operator = item.value;

      if (calculation.secondNumber || currentValue) {
        calculate(calculation.result, calculation.operator, calculation.firstNumber, calculation.secondNumber);
      } else {
        calculation.secondNumber = calculation.firstNumber;
        calculation.firstNumber = "";
        calculation.display += item.value;
        updateResult();
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