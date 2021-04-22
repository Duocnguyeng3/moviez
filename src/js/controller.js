import 'regenerator-runtime/runtime';
import 'core-js/stable';

import icons from '../img/icons.svg';
import { BASE_URL, API_KEY } from './config.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import * as model from './model.js';;


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

// fetch cast & crew
// https://api.themoviedb.org/3/movie/550/credits?api_key=e616cd78f7df65758287d12dbeae7d4a

// const getMovie = async function () {
//     // const res = await fetch('https://api.themoviedb.org/3/movie/13002?api_key=e616cd78f7df65758287d12dbeae7d4a');
//     // const res = await fetch('https://api.themoviedb.org/3/configuration?api_key=e616cd78f7df65758287d12dbeae7d4a');
//     const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=e616cd78f7df65758287d12dbeae7d4a&query=fight&language=vi-VN');
//     const data = await res.json();
//     console.log(data);
// }
// getMovie();

const search = document.querySelector('.search');
const resultsContainer = document.querySelector('.results')
const movieContainer = document.querySelector('.movie')

// src="https://image.tmdb.org/t/p/w92${result.poster_path}"

const generateMarkupMovie = function (data) {
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
  try {
    e.preventDefault();
    resultsView.renderSpinner();
    // 1.get Search query
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    const results = model.state.search.results;

    const markup = resultsView.render(results);
  } catch (err) {
    console.log(err);
  }
}

const getMovie = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  const markup = generateMarkupMovie(data);

  movieContainer.innerHTML = '';
  movieContainer.insertAdjacentHTML('afterbegin', markup);
}

const ini = function () {
  ['hashchange', 'load'].forEach(e => window.addEventListener(e, getMovie));
  search.addEventListener('submit', getSearchResult);
}
ini();

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
