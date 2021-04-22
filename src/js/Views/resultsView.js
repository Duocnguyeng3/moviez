import View from './View.js';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find any movie, please try again';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__figure">
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

export default new resultsView();