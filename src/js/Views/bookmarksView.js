import View from './View.js';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _btnClearBm = document.querySelector('.btn--clear-bm');
  _errorMessage = `
    <div>
        <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
        </svg>
    </div> 
    <p>
        No bookmarks yet. Find a nice movie and bookmark it :)
    </p>
    `;

  addHandlerClearBookmark(handler) {
    this._btnClearBm.addEventListener('click', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__figure preview__figure--bookmark">
        <img class="preview__poster" src=${result.poster} />
      </figure>
      <div class="preview__description">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__rating"><span>⭐</span>${result.voteAverage}</p>
        <p class="preview__genre">${result.genres.join(', ')}</p>
        <p class="preview__overiew">${result.overview.slice(0, 120)}...</p>
      </div>
    </a>
  </li>
    `
  }
}

export default new bookmarksView();