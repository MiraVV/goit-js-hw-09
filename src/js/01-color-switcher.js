const refs ={
    body: document.querySelector("body"),
    buttonStart : document.querySelector("[data-start]"),
    buttonStop : document.querySelector("[data-stop]"),
}

const CHANGECOLOR_DELAY = 1000;
let setColor = null;

refs.buttonStart.addEventListener("click", changeColor);
refs.buttonStop.addEventListener("click", stopChangeColor);
refs.buttonStop.setAttribute("disabled", true);

function changeColor() {
    setColor = setInterval(() => {
        const newColor = getRandomHexColor();
        refs.body.style.backgroundColor = newColor;
        console.log(newColor)}
   , CHANGECOLOR_DELAY);
   refs.buttonStart.setAttribute("disabled", true);
   refs.buttonStop.removeAttribute("disabled");
}

function stopChangeColor(){
    clearInterval(setColor);
    refs.buttonStart.removeAttribute("disabled");
    refs.buttonStop.setAttribute("disabled", true);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}