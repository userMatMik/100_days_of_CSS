const captchaContainer = document.querySelector('#preview');
const reloadBtn = document.querySelector('#reload');

const listOfChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const capchaLength = 9


const randomNumber = (minNum, maxNum) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
} 


const renderCaptcha = (captcha) => {
   [...captcha].forEach((character) => {
       const spanEl = document.createElement('span');
       spanEl.classList.add('test');
       spanEl.textContent = character;
       spanEl.style.transform = `translateY(${randomNumber(-15, 15)}px) rotate(${randomNumber(-30, 30 )}deg)`
       captchaContainer.appendChild(spanEl);
   })
}

const generateCaptcha = () => {
    let captcha =''
    for (let i = 0; i < capchaLength; i++) {
        // const randomIndex = Math.floor(Math.random() * listOfChars.length); 
        const randomIndex = randomNumber(0, listOfChars.length - 1); 
        captcha += listOfChars[randomIndex];
    }

    renderCaptcha(captcha);
}

reloadBtn.addEventListener('click', () => {
    captchaContainer.textContent = '';
    generateCaptcha();
});


generateCaptcha()
      
  


 
