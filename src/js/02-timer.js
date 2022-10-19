import flatpickr from 'flatpickr';
// Additional import for flatpickr library
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

let timeFromInput = null;
// create object with selected elements
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  fieldEls: document.querySelectorAll('.field'),
  valueEls: document.querySelectorAll('.value'),
};

// create object of parameters for flatpickr library
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

//Initialize input element with flatpickr
flatpickr(refs.input, options);
refs.startBtn.disabled = true;

// converts time
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

// add css styles to elements
function beautifyCss() {
  refs.timer.style.display = 'flex';

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

// add zero to time value if it has only one digit in it
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// callback function for eventListener
function onClickTimeCount() {
  refs.startBtn.disabled = true;

  let timeCounter = setInterval(() => {
    let countDown = new Date(timeFromInput) - new Date();
    let dateObj = convertMs(countDown);

    if (countDown >= 0) {
      refs.daysEl.textContent = addLeadingZero(dateObj.days);
      refs.hoursEl.textContent = addLeadingZero(dateObj.hours);
      refs.minutesEl.textContent = addLeadingZero(dateObj.minutes);
      refs.secondsEl.textContent = addLeadingZero(dateObj.seconds);
    }
  }, 1000);
  Notiflix.Notify.success('Countdown finished');
  setTimeout(
    () => clearInterval(timeCounter),
    new Date(timeFromInput) - new Date()
  );
}

refs.startBtn.addEventListener('click', onClickTimeCount);

beautifyCss();
