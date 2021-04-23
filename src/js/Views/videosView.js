import View from './View.js';

class videoView extends View {
    _container = document.querySelector('.movie');
    _errorMessage = 'There is no video for this movie, please try onother one 😥'
    // the parent element is not available on startup, until the movie is rendered, so we need to define it later
    _parentElement;
    _btnLoadVideo;

    _generateMarkup() {
        return this._data.map(this._generateMarkupVideo).join('');
    }

    _generateMarkupVideo(video) {
        return `
        <iframe allow="fullscreen" class="movie__video" id="ytplayer" type="text/html" width="320" height="240"
        src="https://www.youtube.com/embed/${video.key}?autoplay=0&origin=http://example.com"
        frameborder="0"></iframe>
        `
    }

    addHandlerVideo(handler) {
        this._parentElement = this._container.querySelector('.movie__video-container');
        this._btnLoadVideo = document.querySelector('.btn--load-video');
        this._btnLoadVideo.addEventListener('click', handler);
    }
}

export default new videoView();