import icons from '../../img/icons.svg';

export default class View {
    _data;

    render(data) {
        // this.renderSpinner();
        this._data = data;
        const markup = this._generateMarkup();

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderSpinner() {
        const markup = `
          <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}