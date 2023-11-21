import { clearPage, renderPageTitle } from '../../utils/render';

const ViewMoviePage = async () => {
  try {
    clearPage();
    renderPageTitle('Film');

    const films = await getAllFilms();

    renderFilmsFromString(films);
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

async function getAllFilms() {
  try {
    const response = await fetch('/api/films');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const films = await response.json();

    return films;
  } catch (err) {
    console.error('getAllfilms::error: ', err);
    throw err;
  }
}

function renderFilmsFromString(film) {
  const filmTableAsString = getFilmTableAsString(film);

  const main = document.querySelector('main');

  main.innerHTML += filmTableAsString;
}

function getFilmTableAsString(film) {
  const filmTableLines = getAllTableLinesAsString(film);
  const filmTable = addLinesToTableHeadersAndGet(filmTableLines);
  return filmTable;
}

function addLinesToTableHeadersAndGet(tableLines) {
  const filmTable = `
  <div class="table-responsive pt-5">
    <table class="table table-danger menu">
      <tr>
        <th>Titre</th>
        <th>Link</th>
        <th>budget</th>
        <th>duree</th>
        <th>Option</th>
      </tr>
      ${tableLines}    
    </table>
  </div>
  `;
  return filmTable;
}

function getAllTableLinesAsString(film) {
  let filmTableLines = '';

  film?.forEach((film1) => {
    filmTableLines += `<tr>
      <td>${film1.title}</td>
      <td>${film1.link}</td>
      <td>${film1.budget}</td>
      <td>${film1.duration}</td>
      <td><input class="sup" type=button name=supprimer value=Supprimer id="${film1.id}"></td>
    </tr>`;

    
  });

  return filmTableLines;
}

function supById() {
  const bouton = document.querySelectorAll('.sup');
  bouton.forEach((item) => {
    item.addEventListener('click', () => {
      
      
      
    });
  });
  console.log('sup');
}

export default ViewMoviePage;
