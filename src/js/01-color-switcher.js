const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const NOTIFICATION_DELAY = 1000;
let timeoutId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timeoutId = setTimeout(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, NOTIFICATION_DELAY);
}

function stopChangeColor() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(timeoutId);
}

refs.startBtn.addEventListener('click', changeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);
