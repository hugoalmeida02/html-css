const buttonResgistar = document.querySelector("#buttonResgitar")
const buttonEntrar = document.querySelector("#buttonLogin")
const container1 = document.querySelector("#principal")
const container2 = document.querySelector("#secundario")

buttonResgistar.addEventListener('click', () => {
    container1.style.display = "none"
    container2.style.display = "grid"
})

buttonEntrar.addEventListener('click', () => {
    container1.style.display = "grid"
    container2.style.display = "none"
})
