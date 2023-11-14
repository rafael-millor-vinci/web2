const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = 'Deal with the content of your HomePage';

  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
  .then((response) => {
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  })
  .then((joke) => {
    main.innerHTML = `<div> Joke categ : ${joke.category} </div> `;
    main.innerHTML += `<div>joke : ${joke.joke}</div> `;
    
  })
  .catch((err) => {
    console.log('HOMEpage error : ',err);
  });


  
};



export default HomePage;
