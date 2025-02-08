const display = document.querySelector("#display");

let result = ``;
let on

document.querySelectorAll(".button").forEach((link) => {
  link.addEventListener("click", () => {
    const value = link.dataset.value;

    if (value === "clear") {
      clearDisplay(display);
      result = ``;
    } else if (value === "calculate") {
      calculate(result, display);
      on = true
    } else if (on) {
      on = false
      clearDisplay(display);
      result = ``;
      if (value === "^") {
        display.innerHTML += `${value}`;
        result += `**`;
      } else {
        display.innerHTML += `${value}`;
        result += `${value}`;
      }
    }else{
      if (value === "^") {
        display.innerHTML += `${value}`;
        result += `**`;
      } else {
        display.innerHTML += `${value}`;
        result += `${value}`;
      }
    }
  });
});

function calculate(result, display) {
  try {
    result = eval(result);
    display.innerHTML = `${result}`;
    console.log(result);
  } catch (error) {
    display.innerHTML = "Error";
  }
}

function clearDisplay(display) {
  display.innerHTML = ``;
}
