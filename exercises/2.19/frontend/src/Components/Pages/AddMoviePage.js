import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

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
  form.addEventListener('submit', onAddMovie);
}

async function onAddMovie(e) {
  e.preventDefault();

  const filmName = document.querySelector('#filmName').value;
  const link = document.querySelector('#link').value;
  const time = document.querySelector('#time').value;
  const budget = document.querySelector('#budget').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      title: filmName,
      duration: time,
      budget,
      link,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  
  const response = await fetch('/api/films', options); // fetch return a promise => we wait for the response

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const newFilm = await response.json(); // json() returns a promise => we wait for the data

  // eslint-disable-next-line no-console
  console.log('New pizza added : ', newFilm);

  Navigate('/view');
}

export default AddMoviePage;
