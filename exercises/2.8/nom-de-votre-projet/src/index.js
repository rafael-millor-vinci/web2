import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import logoImage from './img/logoM.png';

renderLogoImage(logoImage);

function renderLogoImage(logoUrl) {
  const image = new Image(); // or document.createElement('img');
  image.src = logoUrl;
  image.height = 50;
  const footer = document.querySelector('footer');
  footer.appendChild(image);
}
const QUIZZ = [
    {
        id:1,
        question:"Quel couleur est l'orange ?",
        bonneReponse:"orange",
        mauvaiseReponse1:"bleu",
        mauvaiseReponse2:"vert",
        mauvaiseReponse3:"rouge"
    }
];

const btn = document.getElementById("bouton");
btn.addEventListener("click", renderQuizzFromString(QUIZZ));



function renderQuizzFromString(quizz) {

    const quizzAsString = getQuizzAsString(quizz);

    const div = document.getElementById("quizz");

    div.innerHTML += quizzAsString;

    attachClickOnBouttonToQuizz();
}
attachClickOnBouttonToQuizz();

function getQuizzAsString(quizz) {
    const quizzString = getAllTableLinesAsString(quizz);
    const question = addLinesToHeader(quizzString)
    return question;
    
}

function addLinesToHeader(quizzString) {
    const question = `
    <div class="table-responsive pt-5">
        <h2>Quizz</h2>
      <table class="table table-danger">
        
        ${quizzString}    
      </table>
    </div>
    `;
    return question;
  }

function getAllTableLinesAsString(quizz) {
    let quizzQuestion = '';
  
    quizz?.forEach((question) => {
        quizzQuestion += `<tr>
        <th>${question.question}</th>
        </tr>
        <tr>
        <td> <button class="reponse">  ${question.bonneReponse}</td>
        <td> <button class="reponse"> ${question.mauvaiseReponse1}</td>
        <td> <button class="reponse"> ${question.mauvaiseReponse2}</td>
        <td> <button class="reponse"> ${question.mauvaiseReponse3}</td>
      </tr>`;
    });
      
    return quizzQuestion;
  }

  function attachClickOnBouttonToQuizz(){
    const reponse = document.querySelector('reponse');
    const reponseDonne = document.getElementById('reponseDonne');

    reponse.addEventListener('mouseover',() => {
        reponse.className = 'text-decoration-underline';
    });

    reponse.addEventListener('mouseout',() => {
        reponse.className = 'text-decoration-underline';
    });


    reponse.addEventListener('click',() => {
        reponseDonne.innerText=reponse.innerText
    });
  }