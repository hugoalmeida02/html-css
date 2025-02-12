const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.querySelector("#main");
const form = document.querySelector("#search");
const search = document.querySelector("#searchBar");

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      let HTML = ``;
      data.results.forEach((element) => {
        HTML += `<div class="movie">
        <img class="movieImg" src="${IMG_PATH + element.poster_path}" />
        <p class="movieTitle">${element.title} <br> <a class="reviews" href="movie.html?id=${element.id}&title=${element.title}" target="_self">Reviews 🔍</a></p>
      </div>`;
      });
      main.innerHTML = HTML;
    });
}


form.addEventListener("submit", (e) => {
    e.preventDefault()
    main.innerHTML = ``

    const searchItem = search.value

    if(searchItem) {
        returnMovies(SEARCHAPI + searchItem)
        search.value = ``
    }
})