import { clearPage, renderPageTitle } from "../../utils/render";

const HomePage = () => {
    clearPage();
    renderPageTitle('Home');
  const main = document.querySelector('main');
  main.innerHTML = 'Deal with the content of your HomePage';
};

export default HomePage;
