import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
    
const startBth = document.querySelector("button[data-start]")    
const daysEl = document.querySelector('[data-days]')
const hoursEl =document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

function addLeadingZero(value){
    return String(value).padStart(2, 0);
}

function startCountDown(targetDate){
    startBth.disabled = true;
    const intervalId = setInterval(() => {
    const now = new Date().getTime()
    const difference = targetDate - now

        if(difference <=0){
            clearInterval(intervalId)
            startBth.disabled = false;
            Notiflix.Notify.success("таймер завершився успішно")
            return;
        }

        const { days, hours, minutes, seconds} = convertMs(difference);

        daysEl.textContent = addLeadingZero(days)
        hoursEl.textContent = addLeadingZero(hours)
        minutesEl.textContent = addLeadingZero(minutes)   
        secondsEl.textContent = addLeadingZero(seconds)
    }, 1000)
}

const dateTimerPicker = document.getElementById('datetime-picker')

startBth.disabled = true;

flatpickr(dateTimerPicker, { 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
      const selectedDate = selectedDates[0]
    
      if(selectedDate <= new Date()){
        Notiflix.Notify.warning("Будь ласка, виберіть дату у майбутньому часі");
        startBth.disabled = true;
      } else {
        startBth.disabled = false;
      }
    },
})
    

startBth.addEventListener("click", () => {
    const selectedDate = new Date(dateTimerPicker.value)
    startCountDown(selectedDate)
   
})



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
