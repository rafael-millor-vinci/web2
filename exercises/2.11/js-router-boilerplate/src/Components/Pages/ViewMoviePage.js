import { clearPage, renderPageTitle } from "../../utils/render";

const ViewMoviePage = () => {
    clearPage();
    renderPageTitle('ViewMovie');
    renderViewMoviePage();
    
  };

  function renderViewMoviePage() {
    const main = document.querySelector('main');
    main.innerHTML = 'ViewMovie Page';
  }
  
  export default ViewMoviePage;