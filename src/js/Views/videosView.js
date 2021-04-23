import View from './View.js';

class videoView extends View {
    _container = document.querySelector('.movie');

    // the parent element is not available on startup, until the movie is rendered, so we need to define it later
    _parentElement;
    _btnLoadVideo;

    _generateMarkup() {
        return this._data.map(this._generateMarkupVideo).join('');
    }

    _generateMarkupVideo(video) {
        return `
        <iframe class="movie__video" id="ytplayer" type="text/html" width="320" height="240"
        src="https://www.youtube.com/embed/${video.key}?autoplay=0&origin=http://example.com"
        frameborder="1"></iframe>
        `
    }

    addHandlerVideo(handler) {
        this._parentElement = this._container.querySelector('.movie__video-container');
        this._btnLoadVideo = document.querySelector('.btn--load-video');
        this._btnLoadVideo.addEventListener('click', handler);
    }
}

export default new videoView();