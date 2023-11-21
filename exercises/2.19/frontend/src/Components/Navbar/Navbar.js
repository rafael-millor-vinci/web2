// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

 import HomePage from '../Pages/HomePage';
 import AddMoviePage from '../Pages/AddMoviePage';
 import ViewMoviePage from '../Pages/ViewMoviePage';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Add your brand here</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" data-uri="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/new">New Page</a>
              </li>

              <li class="addMovieItem">
                <a class="nav-link" href="#" data-uri="/add">Add Movie Page</a>
              </li>

              <li class="viewMovieItem">
                <a class="nav-link" href="#" data-uri="/view">View Movie Page</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
  onNavBarClick();
};

function onNavBarClick() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // eslint-disable-next-line
      console.log(`click on ${e.target.innerHTML} navbar item`);
      if (e.target.innerHTML === 'Home') {
        HomePage();
      } else if (e.target.innerHTML === 'Add Movie Page') {
        AddMoviePage();
      } else if (e.target.innerHTML === 'View Movie Page') {
        ViewMoviePage();
      }
    });
  });
}

export default Navbar;