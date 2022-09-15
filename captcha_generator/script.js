const captchaContainer = document.querySelector('#preview');
const reloadBtn = document.querySelector('#reload');
const submitBtn = document.querySelector('#submit');
const captchaInput = document.querySelector('input[type="text"]')

const listOfChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const capchaLength = 9;
let captcha = '';

const validateCaptcha = (captcha) => {
    console.log(captcha);
    const errorMessages = {
        1: 'Input cannot be empty.',
        2: 'Wrong text. Please try again.',
    }
    const captchaGenerator = document.querySelector('#app');
    const enteredText = captchaInput.value;
    const errorMsg = document.querySelector('#error-message');
    const successMsg = document.querySelector('#success');
    if (enteredText.length === 0) {
        errorMsg.textContent = errorMessages[1];
        errorMsg.classList.add('show-error');
    }
    if(enteredText.length !== 0 && enteredText !== captcha) {
        errorMsg.textContent = errorMessages[2];
        errorMsg.classList.add('show-error');
    }
    if(enteredText === captcha) {
        captchaGenerator.classList.add('hide-app');
        successMsg.classList.add('show-success');
    }
}

const randomNumber = (minNum, maxNum) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
} 

const renderCaptcha = (captcha) => {
   [...captcha].forEach((character) => {
       const spanEl = document.createElement('span');
       spanEl.textContent = character;
       spanEl.style.transform = `translateY(${randomNumber(-15, 15)}px) rotate(${randomNumber(-30, 30 )}deg)`;
       captchaContainer.appendChild(spanEl);
   })
}

const generateCaptcha = () => {
    captcha = '';
    for (let i = 0; i < capchaLength; i++) {
        const randomIndex = randomNumber(0, listOfChars.length - 1); 
        captcha += listOfChars[randomIndex];
    }
    renderCaptcha(captcha);
}

reloadBtn.addEventListener('click', () => {
    captchaContainer.textContent = '';
    document.querySelector('input[type="text"]').value = ""
    generateCaptcha();
});

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    validateCaptcha(captcha);
})

submitBtn.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        validateCaptcha(captcha);
    }
})


generateCaptcha();
      
  


 
