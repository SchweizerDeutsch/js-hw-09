const startBth = document.querySelector('button[data-start]')
const stopBth = document.querySelector('button[data-stop]')
let colorinterval = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function startChangeColor() {
    colorinterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)

    startBth.disabled = true;
    stopBth.disabled = false;
  }

  function stopChangeColor() {
    clearInterval(colorinterval)

startBth.disabled = false
stopBth.disabled = true
  }

  startBth.addEventListener("click", startChangeColor)
  stopBth.addEventListener("click", stopChangeColor)