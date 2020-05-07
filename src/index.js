const btnLoad = document.querySelector("#movies-load");
const container = document.querySelector("#movies-container");

function render(data) {
  const moviesFragment = document.createDocumentFragment();

  while( container.firstChild ) {
    container.remove(container.firstChild);
  }

  data.allMovies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.textContent = movie.title;

    moviesFragment.appendChild(movieItem);
  });

  container.appendChild(moviesFragment);
}

function loadMovies(evt) {
  evt.preventDefault();

  const query = `
    query {
      allMovies {
        title
        year
      }
    }
  `

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query
    })
  };

  fetch("http://localhost:4000", options)
    .then(response => response.json())
    .then((json) => {
      if (json.errors) {
        console.error(json.errors);
        alert(json.errors[0].message)
      } else {
        render(json.data)
      }
    })

}

btnLoad.addEventListener("click", loadMovies);
