import { clearPage, renderPageTitle } from "../../utils/render";

const AddMoviePage = () => {
    clearPage();
    renderPageTitle('AddMovie');
    renderAddMoviePage();
    
  };

  function renderAddMoviePage() {
    const main = document.querySelector('main');
    main.innerHTML = 'AddMovie Page';
  }
  
  export default AddMoviePage;
  