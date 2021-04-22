import View from './View.js';

class searchView extends View {
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._blurInput();
        return query;
    }

    _blurInput() {
        this._parentElement.querySelector('.search__field').blur();
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new searchView();