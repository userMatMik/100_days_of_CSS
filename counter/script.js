const counterEl = document.querySelector('#counter');
const decreaseBtn = document.querySelector('#decrease');
const increaseBtn = document.querySelector('#increase');
const resetBtn = document.querySelector('#reset');
const intervalInput = document.querySelector('#set-interval');

let counter = 0;

let i = 1;

console.log(intervalInput)

intervalInput.addEventListener('input', (event) => {
    i = Number(event.target.value);
})

function renderCounter() {
    counterEl.textContent = counter
}

decreaseBtn.addEventListener('click', () => {
    counter -= i
    renderCounter()
})

increaseBtn.addEventListener('click', () => {
    counter += i
    renderCounter()
})

resetBtn.addEventListener('click', () => {
    intervalInput.value = '1';
    i = 1;
    counter = 1;
    renderCounter();
})

