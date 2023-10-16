const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");

var myIntervalId;

startFeux();

function startFeux() {
  myIntervalId = setInterval(changeColor, 2000);
}

let conteur = 0;
function changeColor() {
  if (conteur === 0) {
    block1.style.backgroundColor = "#FF0000";
    block2.style.backgroundColor = "#FFffff";
    block3.style.backgroundColor = "#FFffff";
  }
  if (conteur  === 1) {
    block1.style.backgroundColor = "#FFffff";
    block2.style.backgroundColor = "#FF8000";
    block3.style.backgroundColor = "#FFffff";
  }
  if (conteur  === 2) {
    block1.style.backgroundColor = "#FFffff";
    block2.style.backgroundColor = "#FFffff";
    block3.style.backgroundColor = "#00FF00";
  }
  if (conteur  === 3) {
    block1.style.backgroundColor = "#FFffff";
    block2.style.backgroundColor = "#FF8000";
    block3.style.backgroundColor = "#FFffff";
  }
  

  conteur++;
  if (conteur>=4) {
    conteur=0
    
  }
  
}
