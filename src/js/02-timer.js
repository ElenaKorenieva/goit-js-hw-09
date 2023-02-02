// Libraris import
import flatpickr from 'flatpickr';
// Addition styles import
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// variables
let timeFromInput = null;

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerEl: document.querySelector('.timer'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  fieldEls: document.querySelectorAll('.field'),
  valueEls: document.querySelectorAll('.value'),
};

// function for time converting
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

// function for add zeroes in the date (for example our date is 2, but we need 02)
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// parameters object for flatpickr function
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      timeFromInput = selectedDates[0];
    }
  },
};

// function for adding css styles
function beautify() {
  refs.timerEl.style.display = 'flex';

  refs.fieldEls.forEach(fieldEl => {
    fieldEl.style.display = 'flex';
    fieldEl.style.flexDirection = 'column';
    fieldEl.style.alignItems = 'center';
    fieldEl.style.marginRight = '15px';
    fieldEl.style.color = 'green';
  });

  refs.valueEls.forEach(valueEl => {
    valueEl.style.fontSize = '30px';
  });
}

//create flatpickr instance
flatpickr(refs.inputEl, options);

// status of the button (for now the button is inactive)
refs.startBtn.disabled = true;

// click handler for event listener (out timer starts and shown in the page)
function onStartButtonClick() {
  refs.startBtn.disabled = true;

  let intervalId = setInterval(() => {
    let dateDiff = new Date(timeFromInput) - new Date();
    let countDate = convertMs(dateDiff);

    if (dateDiff >= 0) {
      refs.daysEl.textContent = addLeadingZero(countDate.days);
      refs.hoursEl.textContent = addLeadingZero(countDate.hours);
      refs.minutesEl.textContent = addLeadingZero(countDate.minutes);
      refs.secondsEl.textContent = addLeadingZero(countDate.seconds);
    } else {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(intervalId);
    }
  }, 1000);
}

// add event listener to the DOM elements
refs.startBtn.addEventListener('click', onStartButtonClick);

// apply styles to DOM elements
beautify();
