import 'regenerator-runtime/runtime';
import 'core-js/stable';

import icons from '../img/icons.svg';
import { BASE_URL, API_KEY } from './config.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import movieView from './Views/movieView.js';
import paginationView from './Views/paginationView.js';
import videosView from './Views/videosView.js';
import bookmarksView from './Views/bookmarksView';
import * as model from './model.js';



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

const getVideo = async function (goToPage) {
  try {
    videosView.renderSpinner();
    await model.loadVideo(model.state.movie.id);

    console.log(model.state.movie.videos);

    videosView.render(model.state.movie.videos);

  } catch (err) {

  }
}

const getSearchResult = async function () {
  try {
    // 1.get Search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // load search result in model
    await model.loadSearchResult(query);
    const results = model.state.search.results;

    // Render the result base on infomation in model.js
    resultsView.render(results);

    // Render the pagination
    model.state.search.page = 1;
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
}

const getMovie = async function () {
  try {

    // get the id of the movie 
    const id = window.location.hash.slice(1);
    if (!id) return;
    movieView.renderSpinner();

    // Load the movie in model
    await model.loadMovie(id);
    const data = model.state.movie;

    movieView.render(data);

    // add Event listener to the load movie's video btn
    videosView.renderSpinner;
    videosView.addHandlerVideo(getVideo);

  } catch (err) {
    console.error(err);
    movieView.renderError();
  }
}

const controlPagination = async function (goToPage) {
  model.state.search.page = goToPage;
  await model.loadSearchResult();
  const results = model.state.search.results;

  // Render the result base on infomation in model.js
  const markup = resultsView.render(results);
  // Render the pagination
  paginationView.render(model.state.search);
}

const controlAddBookmark = function () {
  model.addBookmark(model.state.movie);
  console.log(model.state.bookmark);
  bookmarksView.render(model.state.bookmark);
}

const ini = function () {
  movieView.addHandlerRender(getMovie);
  searchView.addHandlerSearch(getSearchResult);
  paginationView.addHandlerPage(controlPagination);
  movieView.addHandlerAddBookmark(controlAddBookmark);
}
ini();
