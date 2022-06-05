import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateInput : document.querySelector("#datetime-picker"),
    startBtn : document.querySelector ("[data-start]"),
    daysMy : document.querySelector("[data-days]"),
    hoursMy : document.querySelector("[data-hours]"),
    minutesMy : document.querySelector("[data-minutes]"),
    secondsMy : document.querySelector("[data-seconds]"),
    timer : document.querySelector(".timer"),
    field : document.querySelectorAll(".field"),
    label : document.querySelectorAll(".label")
}
// минимальное оформление элементов интерфейса.
refs.timer.style.display = "flex";
refs.field.forEach(e => {
    e.style.display = "flex";
    e.style.flexDirection = "column";
    e.style.textAlign = "center";
    e.style.marginTop = "20px";
    e.style.marginRight = "15px";
    e.style.fontWeight = "bold";
    e.style.fontSize = "35px";
});

refs.label.forEach(e =>{
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
})


let CURRENT_DATE = new Date();

refs.startBtn.setAttribute("disabled", true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if(selectedDates[0] < CURRENT_DATE){
            window.alert("Please choose a date in the future");
        } else {
            refs.startBtn.disabled = false;
            refs.startBtn.addEventListener("click", timer);
            
        }
    },
};

const fp = flatpickr(refs.dateInput, options);

function timer (selectedDate) {
    setInterval(() => {
        const selectedDate = fp.selectedDates[0].getTime();
        const delta = selectedDate - new Date(); 
        renderTimer(delta);
    }, 1000);
  };

function pad(value){
    return String(value).padStart(2,"0");
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}
  
const renderTimer = string => {
    let { days, hours, minutes, seconds } = convertMs(string);
    refs.daysMy.textContent = days;
    refs.minutesMy.textContent = minutes;
    refs.hoursMy.textContent = hours;
    refs.secondsMy.textContent = seconds;
};

