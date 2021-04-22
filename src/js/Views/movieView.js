import View from './View.js';
import icons from '../../img/icons.svg';

class movieView extends View {
    _parentElement = document.querySelector('.movie');
    _errorMessage = 'We could not find this movie, please try again';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
    }
    _generateMarkup() {
        const movie = this._data;

        return `
            <figure class="movie__fig">
                <img src="${movie.backdrop}" alt="${movie.title} backdrop"
                    class="movie__img" />
                <h1 class="movie__title">
                    <span>${movie.title}</span>
                </h1>
            </figure>

            <div class="movie__description">
                ${this._generateMarkupDetail(
            ['runtime(min)', movie.runtime],
            ['language', movie.language],
            ['release Date', movie.releaseDate])}
               
                <button class="btn--round movie__bookmark-btn">
                    <svg class="">
                        <use href="${icons}#icon-bookmark-fill"></use>
                    </svg>
                </button>
                <div class="cast__container">
                    <h3 class="movie__heading">Cast</h3>
                    <ul class="cast">
                        ${movie.cast.map(this._generateMarkupCast).join('')}
                    </ul>
                </div>
                <div class="movie__overiew">
                    <h3 class="movie__heading">Overview</h3>
                    <p class="movie__overiew-text">
                    ${movie.overview}
                    </p>
                </div>

                <div class="btn--text">
                    See trailer &rarr;
                </div>
                <a href="${movie.homepage}" class="movie__home-page">
                    Movie home page &rarr;
                </a>
            </div>
        `
    }

    _generateMarkupCast(cast) {
        return `
        <li class="cast__item">
        <img src="${cast.profileImg}"
            alt="${cast.name}" class="cast__img">
        <div class="cast__name">
            ${cast.name}
        </div>
        <div class="cast__character">
        ${cast.character}
        </div>
    </li>
        `
    }

    _generateMarkupDetail(...detailPairs) {
        const markup = detailPairs.map(pair =>
            `
            <div class="movie__description-box">
                <div class="movie__description-box--key">${pair[0]}</div>
                <div class="movie__description-box--value">${pair[1]}</div>
            </div>
        `
        ).join('');
        return markup;
    }
}

export default new movieView();