import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form'),
  firstDelayEl: document.querySelector('input[name="delay"]'),
  delayStepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

console.log(refs);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

refs.formEl.addEventListener('submit', onCLick);

function onCLick(event) {
  event.preventDefault();
  // console.log(refs.firstDelayEl);
  const { delay, step, amount } = event.target.elements;
  for (let i = 1, d = +delay.value; i <= +amount.value; i++, d += +step.value) {
    createPromise(i, d)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise  ${position} in ${delay}ms`
        );
      });
  }
}
