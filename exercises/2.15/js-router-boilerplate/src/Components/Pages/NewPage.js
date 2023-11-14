import { clearPage } from '../../utils/render';

const NewPage = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  /*
  const submit = document.createElement('input');
  submit.value = 'Go back to HomePage';
  submit.className = 'btn btn-secondary mt-3';
  submit.addEventListener('click', () => {
    Navigate('/');
  });

  main.appendChild(submit); */

  fetch('http://localhost:3000/questions')
    .then((response) => {
      if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      return response.json();
    })
    .then((question) => {
      
      const question1 =question[Math.floor(Math.random() * question.length)];
      const question2 =question[Math.floor(Math.random() * question.length)];
      const question3 =question[Math.floor(Math.random() * question.length)];

        
        const questionBox1 = `
      <h1>Questions</h1>
      <form>
      <p>${question1.question}:</p>
      <input type="radio" id="rep11" name="rep1" value="${question[1].answers[0].text}">
  <label for="rep11">${question1.answers[0].text}</label><br>
  <input type="radio" id="rep12" name="rep1" value="${question[1].answers[1].text}">
  <label for="rep12">${question1.answers[1].text}</label><br>  
  <input type="radio" id="rep13" name="rep1" value="${question[1].answers[2].text}">
  <label for="rep13">${question1.answers[2].text}</label><br><br>
  <div>-----------</div>
  <p>${question2.question}:</p>
<input type="radio" id="rep21" name="rep2" value="${question[1].answers[0].text}">
<label for="rep21">${question2.answers[0].text}</label><br>
<input type="radio" id="rep22" name="rep2" value="${question[1].answers[1].text}">
<label for="rep22">${question2.answers[1].text}</label><br>  
<input type="radio" id="rep23" name="rep2" value="${question[1].answers[2].text}">
<label for="rep23">${question2.answers[2].text}</label><br><br>

<div>-----------</div>
  <p>${question3.question}:</p>
<input type="radio" id="rep31" name="rep3" value="${question[1].answers[0].text}">
<label for="rep31">${question3.answers[0].text}</label><br>
<input type="radio" id="rep32" name="rep3" value="${question[1].answers[1].text}">
<label for="rep32">${question3.answers[1].text}</label><br>  
<input type="radio" id="rep33" name="rep3" value="${question[1].answers[2].text}">
<label for="rep33">${question3.answers[2].text}</label><br><br>
  
  
<input type="submit" value="Submit"> 

</form>
      `;

      main.innerHTML += questionBox1;
      main.innerHTML += '<div>-----</div>';

      const form = document.querySelector('form');
      form.addEventListener('submit',(e) => {
        e.preventDefault();
        // eslint-disable-next-line
        console.log('calcule resultat');
        
        
      });
      
      
    })
    .catch((err) => {
      console.log('HOMEpage error : ', err);
    });
}

export default NewPage;









 