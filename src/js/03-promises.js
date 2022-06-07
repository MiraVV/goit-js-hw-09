import Notiflix from 'notiflix';

const refs = {
  createBtn : document.querySelector("button"),
  delayStep : document.querySelector("[name='step']"),
  firstDelay : document.querySelector("[name='delay']"),
  amount : document.querySelector("[name='amount']"),
}

refs.createBtn.addEventListener("click", onSubmitBtn);

function onSubmitBtn(e){
  e.preventDefault();
  for(let i=0; i<refs.amount.value; i+=1) {
    const position =i+1;
    const delay = Number(refs.firstDelay.value)+Number(refs.delayStep.value)*i;
    setTimeout(() =>{createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })},delay); 
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
      setTimeout (() =>{
      if (shouldResolve) {
      resolve({position, delay});
      } else {
        reject({position, delay});
      }
    })},delay);
  } 
