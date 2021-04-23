import { BASE_URL, API_KEY, BASE_IMG_URL, POSTER_SIZE, BACKDROP_SIZE, CAST_SIZE, CAST_NUMBER } from './config.js';
import { getJSON } from './helpers.js';

import { async } from "regenerator-runtime"
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import noAvatarPath from '../img/no_avatar.png';
import noPosterPath from '../img/no_poster.png';

export const state = {
    movie: {},
    search: {
        query: '',
        results: [],
        page: 1
    },
    bookmark: []
}
const getGenre = function (id) {
    const name = movieGenres.find(ele => ele.id === id).name;
    return name;
}

export const loadSearchResult = async function (query = state.search.query, page = state.search.page) {
    try {
        state.search.query = query;
        const data = await getJSON(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
        state.search.page = data.page;
        state.search.totalPages = data.total_pages;

        state.search.results = data.results.map(result => {
            // if (result.poster_path && result.backdrop_path)
            return {
                poster: result.poster_path ? `${BASE_IMG_URL}${POSTER_SIZE}${result.poster_path}` : noPosterPath,
                id: result.id,
                genres: result.genre_ids.map(id => getGenre(id)),
                title: result.title,
                voteAverage: result.vote_average,
                overview: result.overview
            }
        }).filter(result => result);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getCast = async function (id) {
    try {
        const data = await getJSON(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        if (!data) return;

        // get maximum CAST_NUMBER of casts
        const casts = data.cast.length > CAST_NUMBER ? data.cast.slice(0, CAST_NUMBER) : data.cast;

        // get essential information from return image Object
        const cast = casts.map(function (cast) {
            return {
                name: cast.name,
                character: cast.character,
                profileImg: cast.profile_path ? `${BASE_IMG_URL}${CAST_SIZE}${cast.profile_path}` : noAvatarPath
            }
        });
        return cast;
    } catch (err) {
        console.log(err);

        // If error to fetch the cast, return an empty array
        return [];
    }
}

export const loadMovie = async function (id) {
    try {
        const data = await getJSON(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const cast = await getCast(id);

        // push movie infomation to State
        state.movie = {
            id: data.id,
            runtime: data.runtime,
            language: data.spoken_languages.map(ele => ele.name).join(', '),
            releaseDate: data.release_date,
            overview: data.overview,
            homepage: data.homepage,
            poster: data.poster_path ? `${BASE_IMG_URL}${POSTER_SIZE}${data.poster_path}` : noPosterPath,
            backdrop: data.backdrop_path ? `${BASE_IMG_URL}${BACKDROP_SIZE}${data.backdrop_path}` : noPosterPath,
            title: data.title,
            genres: data.genres.map(genre => genre.name),
            voteAverage: data.vote_average,
            cast: cast
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export const loadVideo = async function (id) {
    try {
        const data = await getJSON(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        const videos = data.results;

        state.movie.videos = videos.filter(video => video.site === "YouTube");

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const addBookmark = function (movie) {
    state.bookmark.push(movie);
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