import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const delayInput = form.querySelector('[name="delay"]');
  const stepInput = form.querySelector('[name="step"]');
  const amountInput = form.querySelector('[name="amount"]');
  
  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);
  
  createPromises(firstDelay, step, amount);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(firstDelay, step, amount) {
  let currentDelay = firstDelay;
  
  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    currentDelay += step;
  }
}
