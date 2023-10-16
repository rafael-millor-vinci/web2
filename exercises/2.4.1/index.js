const btn = document.getElementById("bouton");

btn.addEventListener("mouseover", startCount);
btn.addEventListener("click", countClick);
btn.addEventListener("mouseout",resetCount);

let nbClick = 0;

let timeoutCount;
const delayInMiliSeconds = 5000;

function startCount() {
    dateLancement = new Date().getTime();
    message.innerText="Game has begun";
    timeoutCount = setTimeout(() => {
        message.innerText = "Game over, you did not click 10 times within 5s !";
    },delayInMiliSeconds);

}

function countClick() {
    nbClick++;
    if (nbClick === 10  ) {
        clearTimeout(timeoutCount);
        message.innerText = `You win ! You clicked 10 times within ${new Date().getTime()-dateLancement} ms`  
      }   
}

function resetCount() {
    nbClick=0;
    clearTimeout(timeoutCount);
    message.innerText="Game has been reset";
    
}

