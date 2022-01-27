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
    } else if (currentValue) {
        if (operator == "+") {
            currentValue = Number(result) + Number(firstN);
        } else if (operator === "-") {
            currentValue = Number(result) - Number(firstN);
        } else if (operator === "/") {
            currentValue = Number(result) / Number(firstN);
        } else if (operator === "*") {
            currentValue = Number(result) * Number(firstN);
        }
        calculation.firstNumber = "";
    }
    console.log("currentValue", currentValue)
    calculation.result = currentValue;
    console.log("result", calculation.result);
    calculation.display = calculation.result;
    updateResult();
};


buttons.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        if (item.classList.contains('number')) {
            if (currentValue && !calculation.firstNumber) {
                console.log("firstCase")
                calculation.display = currentValue + calculation.operator;
                calculate(currentValue, calculation.operator, calculation.firstNumber, calculation.secondNumber);
                updateResult();
            } else if (currentValue && calculation.firstNumber) {
                console.log("secondcase")
                calculation.display = currentValue + calculation.operator;
                calculate(currentValue, calculation.operator, calculation.firstNumber, calculation.secondNumber);
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
                calculate(currentValue, calculation.operator, calculation.firstNumber, calculation.secondNumber);
            }

        } else if (item.classList.contains("clear")) {
            calculation = {
                display: "",
                firstNumber: "",
                secondNumber: "",
                operator: "",
                result: "",
            };
            currentValue = "";
            updateResult();
        } else if (item.classList.contains('equal')) {

            calculate(currentValue, calculation.operator, calculation.firstNumber, calculation.secondNumber);

            calculation = {
                display: "",
                firstNumber: "",
                secondNumber: "",
                operator: "",
                result: "",
            };
            currentValue = "";
        }
    });
});