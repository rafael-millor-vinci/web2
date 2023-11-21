import { clearPage, renderPageTitle } from "../../utils/render";

const AddMoviePage = () => {
  clearPage();
  renderPageTitle('AddMovie');
  renderAddMoviePage();

};

function renderAddMoviePage() {
  const main = document.querySelector('main');
  main.innerHTML = 'AddMovie Page';

  const form = document.createElement('form');
  form.className = 'p-5';

  const filmName = document.createElement('input');
  filmName.type = 'text';
  filmName.id = 'filmName';
  filmName.placeholder = 'filmName';
  filmName.required = true;
  filmName.className = 'form-control mb-3';

  const time = document.createElement('input');
  time.type = 'number';
  time.id = 'time';
  time.required = true;
  time.placeholder = 'time';
  time.className = 'form-control mb-3';

  const budget = document.createElement('input');
  budget.type = 'number';
  budget.id = 'budget';
  budget.required = true;
  budget.placeholder = 'budget';
  budget.className = 'form-control mb-3';

  const link = document.createElement('input');
  link.type = 'link';
  link.id = 'link';
  link.required = true;
  link.placeholder = 'link';
  link.className = 'form-control mb-3';



  const submit = document.createElement('input');
  submit.value = 'Add';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(filmName);
  form.appendChild(time);
  form.appendChild(budget);
  form.appendChild(link);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit',(e) => {
    e.preventDefault();
    // eslint-disable-next-line
    console.log('Ajoutt film');
    // eslint-disable-next-line
    console.log(form.filmName.value);
  });
  
}



export default AddMoviePage;
