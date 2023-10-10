const msg = document.getElementById("messageSouhait");


function retour(e){
    e.preventDefault();
    
   // var input = document.getElementById("souhait").value;
    var input = souhait.value;

    msg.style.display = "none";
    msg3.innerText="Ton souhait : " + input;
    
}
msg.addEventListener("submit", retour);