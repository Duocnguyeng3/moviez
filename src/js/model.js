import { BASE_URL, API_KEY, BASE_IMG_URL, POSTER_SIZE } from './config.js';
import { getJSON } from './helpers.js';

import { async } from "regenerator-runtime"
import 'regenerator-runtime/runtime';
import 'core-js/stable';

export const state = {
    movie: {},
    search: {
        results: [],
        page: 1
    },
    bookmark: []
}
const getGenre = function (id) {
    const name = movieGenres.find(ele => ele.id === id).name;
    return name;
}

export const loadSearchResult = async function (query) {
    try {
        const data = await getJSON(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        console.log(data);
        state.search.page = data.page;
        state.search.totalPage = data.total_pages;

        state.search.results = data.results.map(result => {
            if (result.poster_path && result.backdrop_path) return {
                poster: `${BASE_IMG_URL}${POSTER_SIZE}${result.poster_path}`,
                id: result.id,
                genres: result.genre_ids.map(id => getGenre(id)),
                title: result.title,
                voteAverage: result.vote_average,
                overview: result.overview
            }
        }).filter(result => result);
        console.log(state);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/*
page: 1
results: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
total_pages: 88
total_results: 1752

*/

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