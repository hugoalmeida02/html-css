const display = document.querySelector("#display");

document.querySelectorAll(".button").forEach((link) => {
    
  link.addEventListener("click", () => {
    const value = link.dataset.value
    if (value === "delete") {
        display.innerHTML = ``;
    } else if (value === "calculate") {
        calculate(display.innerHTML)
    } else {
      display.innerHTML += `${value}`;
    } 
  }); 
});
