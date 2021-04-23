import View from './View.js';
import icons from '../../img/icons.svg';


class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPage(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const totalPages = this._data.totalPages;

    // if on other page
    if (curPage !== 1 && curPage < totalPages) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <div class="pagination__page">
          <span class="pagination__page--current">${curPage}</span>/
          <span class="pagination__page--all">${totalPages}</span>
        </div>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
            `
    }

    // if on the last page
    if (curPage > 1 && curPage === totalPages) {
      return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <div class="pagination__page">
                <span class="pagination__page--current">${curPage}</span>/
                <span class="pagination__page--all">${totalPages}</span>
            </div>
            `
    }

    // if on the 1st page and there are other pages
    if (curPage === 1 && curPage < totalPages) {
      return `
        <div class="pagination__page">
            <span class="pagination__page--current">${curPage}</span>/
            <span class="pagination__page--all">${totalPages}</span>
        </div>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
    }

    // if on the 1st page and NO others
    return '';
  }
}

export default new paginationView();