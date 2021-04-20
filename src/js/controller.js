

import 'regenerator-runtime/runtime';
import 'core-js/stable';

// fetch detail from a movie
// https://api.themoviedb.org/3/movie/550?api_key=e616cd78f7df65758287d12dbeae7d4a

// fetch a list of movie base on keyword
// https://api.themoviedb.org/3/search/movie?api_key=e616cd78f7df65758287d12dbeae7d4a&query=fight
// https://api.themoviedb.org/3/search/keyword?api_key=e616cd78f7df65758287d12dbeae7d4a&query=fight&page=1

// img path (w100 - w500)
// https://image.tmdb.org/t/p/w500/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg

// config data like image base url
// https://api.themoviedb.org/3/configuration?api_key=e616cd78f7df65758287d12dbeae7d4a

//multi search
// &language=vi-VN

// const getMovie = async function () {
//     // const res = await fetch('https://api.themoviedb.org/3/movie/13002?api_key=e616cd78f7df65758287d12dbeae7d4a');
//     // const res = await fetch('https://api.themoviedb.org/3/configuration?api_key=e616cd78f7df65758287d12dbeae7d4a');
//     const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=e616cd78f7df65758287d12dbeae7d4a&query=fight&language=vi-VN');
//     const data = await res.json();
//     console.log(data);
// }
// getMovie();

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e616cd78f7df65758287d12dbeae7d4a';
const search = document.querySelector('.search');
const resultsContainer = document.querySelector('.results')
const movieContainer = document.querySelector('.movie')

const testObject = [
    { "number": 1, "name": 'Nick' },
    { "number": 2, "name": 'Judy' },
    { "number": 3, "name": 'David' }
];
const id = 2;
const test = testObject.map(ele => ele.number = id ? ele.name : '');

const getGenre = function (id) {
    const name = movieGenres.find(ele => ele.id === id).name;
    return name;
}

// src="https://image.tmdb.org/t/p/w92${result.poster_path}"
const generateMarkupResult = function (result) {
    return `
    <li class="preview">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__figure">
        <img class="preview__poster" src=${result.poster_path ? `https://image.tmdb.org/t/p/w154${result.poster_path}` : `src/img/no_poster.png`} />
      </figure>
      <div class="preview__description">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__rating"><span>⭐</span>${result.vote_average}</p>
        <p class="preview__genre">${result.genre_ids.map(getGenre).join(', ')}</p>
        <p class="preview__overiew">${result.overview.slice(0, 100)}...</p>
      </div>
    </a>
  </li>
    `
}

const generateMarkupDetail = function (data) {
    return `
  <figure class="movie__fig">
  <img src="https://image.tmdb.org/t/p/w780${data.backdrop_path}" alt="Tomato" class="movie__img" />
  <h1 class="movie__title">
    <span>${data.title}</span>
  </h1>
</figure>

<div class="movie__description">
  <div class="movie__release-date">
  ${data.release_date}
  </div>
  <p class="movie__overiew">
  ${data.overview}
  </p>
</div>
    `
}


const getSearchResult = async function (e) {
    e.preventDefault();
    const query = document.querySelector('.search__field').value;
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    const results = data.results;
    const markup = results.map(generateMarkupResult).join('');

    resultsContainer.innerHTML = '';
    resultsContainer.insertAdjacentHTML('afterbegin', markup);
}

const getMovie = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    const markup = generateMarkupDetail(data);

    movieContainer.innerHTML = '';
    movieContainer.insertAdjacentHTML('afterbegin', markup);
}

const addHandlerRender = function () {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, getMovie));
}
addHandlerRender();

search.addEventListener('submit', getSearchResult);


// SEARCH WITH KEYWORD RESPONSE OBJECT FORMAT
/*
 adult: false
 backdrop_path: "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg"
 genre_ids: Array(1)
 id: 550
 original_language: "en"
 original_title: "Fight Club"
 overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion."
 popularity: 45.409
 poster_path: "/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg"
 release_date: "1999-10-15"
 title: "Fight Club"
 video: false
 vote_average: 8.4
 vote_count: 21541
 */

// genres ID

const movieGenres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
]
