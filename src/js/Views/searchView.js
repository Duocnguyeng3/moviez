import View from './View.js';

class searchView extends View {
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._parentElement.querySelector('.search__field').blur();
        return query;
    }
}

export default new searchView();