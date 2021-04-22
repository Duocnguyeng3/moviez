import View from './View.js';

class searchView extends View {
    _parentElement = document.querySelector('.search');

    getQuery() {
        this._parentElement.state.focus = 'false';
        return this._parentElement.value;
    }
}

export default new searchView();