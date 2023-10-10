const divs = document.querySelectorAll(".color-div");

divs.forEach((div) => {
  div.addEventListener("mouseover", (e) => {
        
    e.target.style.width = " 100px";
    e.target.style.height = " 100px";
    div.innerText = `${e.target.style.backgroundColor}`;

    
  });

 div.addEventListener("mouseout", (e) => {
    e.target.style.width = " 100px";
    e.target.style.height = " 100px";
    div.innerText = `${e.target.style.backgroundColor}`;

    setTimeout(function () {
        e.target.style.width = " 50px";
    e.target.style.height = " 50px";
    div.innerText = ``;
      }, 300);
  });
});