var nombreClics = 0;


function comptage() {
  nombreClics++;
  document.getElementById("nombreClics").textContent   = nombreClics;
  if (nombreClics>4&&nombreClics<10) {
    //message="Bravo, bel échauffement !"
    message.innerText="Bravo, bel échauffement !";
  }
  if (nombreClics>=10) {
    //message="Vous êtes passé maître en l'art du clic !"
    message.innerText = "Vous êtes passé maître en l'art du clic !";
  }
 // document.getElementById("message").textContent   = message;
}

document.getElementById("boutonClic").addEventListener("click", comptage);

