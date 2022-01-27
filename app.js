let calculation = {
    display: "",
    firstNumber: "",
    secondNumber: "",
    operator: "",
    result: "",
};

let currentValue = "";

const buttons = document.querySelectorAll("button");

const updateResult = () => {
    const display = document.querySelector(".calculator-screen");
    display.value = calculation.display;
};

const calculate = (result, operator, firstN, secondN) => {
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
    console.log("currentValue", currentValue)
    calculation.result = currentValue;
    calculation.display = calculation.result;
    updateResult();
};


buttons.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        if (item.classList.contains('number')) {
            if (currentValue) {
                calculation.firstNumber += item.value;
                calculation.display = currentValue + calculation.operator;
                updateResult();
            }
            calculation.firstNumber += item.value;
            calculation.display += item.value;
            updateResult();

        } else if (item.classList.contains('operator')) {
            // if(!firstNumber && !result){do nothing}
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
                result: "",
            };
            updateResult();
        } else if (item.classList.contains('equal')) {

            calculate(calculation.result, calculation.operator, calculation.firstNumber, calculation.secondNumber);

            calculation = {
                display: "",
                firstNumber: "",
                operator: "",
                result: "",
            };
        }
    });
});